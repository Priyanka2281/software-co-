import { addUser, userLogin, getUsers, getUser, update, remove ,updateManyUsers,updateManyUsersWithDifferentData} from '../services/users.js'
import { generateAuthToken } from '../services/token.js'
import Role from '../models/roles.js'
export const register = async (req, res) => {
    try {
        const { password } = req.body

        if (!password) {
            return res.status(404).send({
                message: "Password is required"
            })
        }
        const user = await createUser(req.body);
        res.status(200).send({
            type: 'success',
            message: 'User added successfully.',
            data: user,
        });
    } catch (error) {
        throw error
    }
};
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await userLogin(email, password);
        const permissions = await Role.findOne({ _id: user.role }, { accessModules: 1 }).lean();
        const token = await generateAuthToken(user, permissions ? permissions.permissions : '');
        res.status(200).send({
            type: 'success',
            data: { user, token },
            message: 'Logged in successfully.',
        });
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.status(200).send({
            type: 'success',
            data: user,
            message: 'User Craeted Successfully.',
        });
    } catch (error) {
        throw error
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { search } = req.query;

        const users = await getUsers(undefined,search);
        return res.status(200).send({
            type: 'success',
            data: users,
            message: 'User List.',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).send({
            type: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await update(req.params.id, req.body);
        return res.status(200).send({
            type: 'success',
            message: 'User Updated Successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await remove(req.params.userId);
        return res.status(200).send({
            type: 'success',
            message: 'User Deleted Successfully.',
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
};
export const updateAll = async (req, res) => {
    try {
        await updateManyUsers(req.body);
        return res.status(200).send({
            type: 'success',
            message: 'All Users Upated Successfully.',
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }
};
export const bulkUpdate = async (req, res) => {
    try {
        const { updateDataArray } = req.body;
        const result = await updateManyUsersWithDifferentData(updateDataArray);
        res.status(200).json({ message: 'Bulk update completed successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to perform bulk update', error: error.message });
    }
};