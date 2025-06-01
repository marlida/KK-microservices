"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUser = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const createUser = async (req, res) => {
    try {
        const { name, tel } = req.body;
        if (!name || !tel) {
            res.status(400).json({
                message: 'Invalid user data provided',
            });
            return;
        }
        const vildationTel = /^\d{10}$/;
        if (!vildationTel.test(tel)) {
            res.status(400).json({
                message: 'Invalid phone number format. It should be 10 digits.',
            });
            return;
        }
        const existingUser = await user_service_1.userService.getUserExists(name);
        if (existingUser) {
            res.status(400).json({
                message: 'User already exists',
            });
            return;
        }
        const newUser = await user_service_1.userService.createUser({ name, tel });
        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating user: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error creating user: Unknown error',
            });
        }
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const userData = await user_service_1.userService.getUser();
        res.status(200).json({
            message: 'User data retrieved successfully',
            data: userData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving user data: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving user data: Unknown error',
            });
        }
    }
};
exports.getUser = getUser;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'User ID is required',
            });
            return;
        }
        const userData = await user_service_1.userService.getUserById(parseInt(id));
        if (!userData) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }
        res.status(200).json({
            message: 'User data retrieved successfully',
            data: userData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving user data: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving user data: Unknown error',
            });
        }
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { name, tel } = req.body;
        const { id } = req.params;
        if (!id || !name || !tel) {
            res.status(400).json({
                message: 'User ID, name, and tel are required',
            });
            return;
        }
        const userNotFound = await user_service_1.userService.getUserById(parseInt(id));
        if (!userNotFound) {
            res.status(404).json({
                message: 'User with this ID does not exist',
            });
            return;
        }
        const updatedUser = await user_service_1.userService.updateUser(parseInt(id), { name, tel });
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating user: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error updating user: Unknown error',
            });
        }
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'User ID is required',
            });
            return;
        }
        const deletedUser = await user_service_1.userService.deleteUser(parseInt(id));
        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting user: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error deleting user: Unknown error',
            });
        }
    }
};
exports.deleteUser = deleteUser;
