import { User, UserCreateInput } from "../types/user";
import prisma from "../config/db";

export class userService {
    static createUser = async (userData: UserCreateInput): Promise<User> => {
        try {
            const newUser = await prisma.user.create({
                data: userData,
            });
            return newUser;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            } else {
                throw new Error("Error creating user: Unknown error");
            }
        }
    }

    static getUser = async (): Promise<User[]> => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving user data: ${error.message}`);
            } else {
                throw new Error("Error retrieving user data: Unknown error");
            }
        }
    }

    static getUserById = async (id: string): Promise<User | null> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving user by ID: ${error.message}`);
            } else {
                throw new Error("Error retrieving user by ID: Unknown error");
            }
        }
    }

    static getUserExists = async (name: string): Promise<User | null> => {
        try {
            const user = await prisma.user.findMany({
                where: { name: String(name) },
            });
            return user[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving user by name: ${error.message}`);
            } else {
                throw new Error("Error retrieving user by name: Unknown error");
            }
        }
    }

    static updateUser = async (id: number, userData: UserCreateInput): Promise<User> => {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: userData,
            });
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating user: ${error.message}`);
            } else {
                throw new Error("Error updating user: Unknown error");
            }
        }
    }

    static deleteUser = async (id: number): Promise<User> => {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id: id },
            });
            return deletedUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting user: ${error.message}`);
            } else {
                throw new Error("Error deleting user: Unknown error");
            }
        }
    }
}