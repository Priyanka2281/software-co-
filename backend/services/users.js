import User from '../models/users.js'
import mongoose from 'mongoose'
/**
 * Create a user
 * @param {Object} userBody
 * @return {Promise<User>}
 */
export const addUser = async (userBody) => {
    try {
        return await User.create(userBody);
    } catch (error) {
        throw error
    }
};
/**
 * Get user by email
 * @param {string} email
 * @return {Promise<User>}
 */
export const getUserByEmail = async (email) => {
    return User.findOne({ email });
};
export const getUser = async (id) => {
    return User.findOne({ _id: id });
};
export const userLogin = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        const error = new Error('User Not Found');
        error.status = 404;
        throw error;
    }

    if (!(await user.isPasswordMatch(password))) {
        const error = new Error('Incorrect email or password');
        error.status = 403;
        throw error;
    }

    return user;
};

export const getUsers = async (id,search) => {
    try {
        let pipeline = [];
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } }, 
                        { email: { $regex: search, $options: 'i' } } 
                    ]
                }
            });
        }
        if (id) {
            pipeline.push({
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            });
        }

        pipeline.push({
            $lookup: {
                from: 'roles',
                let: { roleId: '$role' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$roleId'] }
                        }
                    },
                    {
                        $project: {
                            roleName: 1,
                            accessModules: 1
                        }
                    }
                ],
                as: 'roleData'
            }
        },
            {
                $project: {
                    name: 1,
                    email: 1,
                    roleName: { $arrayElemAt: ['$roleData.roleName', 0] },
                    accessModules: { $arrayElemAt: ['$roleData.accessModules', 0] },
                }
            });

        // Perform aggregation
        return await User.aggregate(pipeline);
    } catch (error) {
        throw error;
    }
};

export const update = async (userId, updatedData) => {
    return await User.findByIdAndUpdate(userId, updatedData,);
};

export const remove = async (userId) => {
    return await User.findByIdAndUpdate(userId, { isDeleted: true });
};
export const updateManyUsers = async (updateData) => {
    try {
        const result = await User.updateMany({}, { $set: updateData });
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateManyUsersWithDifferentData = async (updateDataArray) => {
    try {
        const bulkOperations = updateDataArray.map(({ filter, update }) => ({
            updateOne: {
                filter,
                update: { $set: update }
            }
        }));
        const result = await User.bulkWrite(bulkOperations);
        return result;
    } catch (error) {
        throw error;
    }
};