
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { getUsers } from '../services/users.js'
export const checkAuth = (moduleName) => {
    return async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = req.headers.authorization.split(' ')[1];

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Retrieve user data from the token payload
            const user = await getUsers(decoded.userId._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Check if the user has permission for the module
            if (!user[0].accessModules.includes(moduleName)) {
                return res.status(401).json({ message: 'You do not have permission to access this module' });
            }

            // Attach user data to the request object
            req.user = user[0];

            next();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};
