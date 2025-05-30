import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, tel } = req.body;
        if (!name || !tel) {
            res.status(400).json({
                message: 'Invalid user data provided',
            });
            return;
        }

        const existingUser = await userService.getUserExists(name);
        if (existingUser) {
            res.status(400).json({
                message: 'User already exists',
            });
            return;
        }

        const newUser = await userService.createUser({ name, tel });
        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating user: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error creating user: Unknown error',
            });
        }
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = await userService.getUser();
        res.status(200).json({
            message: 'User data retrieved successfully',
            data: userData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving user data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving user data: Unknown error',
            });
        }
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'User ID is required',
            });
            return;
        }

        const userData = await userService.getUserById(id);
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
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving user data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving user data: Unknown error',
            });
        }
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, tel } = req.body;
        const { id } = req.params;
        if (!id || !name || !tel) {
            res.status(400).json({
                message: 'User ID, name, and tel are required',
            });
            return;
        }

        const existingUser = await userService.getUserExists(name);
        if (existingUser && existingUser.id !== parseInt(id)) {
            res.status(400).json({
                message: 'User with this name already exists',
            });
            return;
        }

        const updatedUser = await userService.updateUser(parseInt(id), { name, tel });
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating user: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error updating user: Unknown error',
            });
        }
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'User ID is required',
            });
            return;
        }

        const deletedUser = await userService.deleteUser(parseInt(id));
        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting user: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error deleting user: Unknown error',
            });
        }
    }
};
