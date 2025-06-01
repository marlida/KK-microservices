import { User, UserCreateInput } from "../types/user";
import prisma from "../config/db";
import redisClient from "../config/redis";

export class userService {
    private static clearUserCache = async () => {
        await redisClient.del("users:list");
    }

    private static clearUserCacheById = async (id: number) => {
        await redisClient.del(`user:${id}`);
    }

    static createUser = async (userData: UserCreateInput): Promise<User> => {
        try {
            const telephoneExists = await prisma.user.findFirst({
                where: {
                    tel: userData.tel,
                },
            });
            if (telephoneExists) {
                throw new Error('User with this telephone number already exists');
            }

            const newUser = await prisma.user.create({
                data: userData,
            });

            // Clear cache after creating
            await userService.clearUserCache();

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
            // Try to get users from cache
            const cached = await redisClient.get("users:list");
            if (cached) {
                console.log("User data retrieved from cache");
                return JSON.parse(cached);
            }

            // If not cached, get from DB
            const users = await prisma.user.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            console.log("User data retrieved from database");

            // Cache the result
            await redisClient.set("users:list", JSON.stringify(users), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving user data: ${error.message}`);
            } else {
                throw new Error("Error retrieving user data: Unknown error");
            }
        }
    }

    static getUserById = async (id: number): Promise<User | null> => {
        try {
            const cached = await redisClient.get(`user:${id}`);
            if (cached) {
                console.log("Returning cached user data by ID");
                return JSON.parse(cached);
            }

            console.log(`Retrieving user with ID ${id} from database`);
            const user = await prisma.user.findUnique({
                where: { id: id }
            });

            if (!user) {
                console.log(`User with ID ${id} not found`);
                return null;
            }

            await redisClient.set(`user:${id}`, JSON.stringify(user), {
                EX: 60 * 60, // Cache for 1 hour
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
            const existingName = await prisma.user.findFirst({
                where: {
                    name: userData.name,
                    NOT: { id }
                }
            });

            if (existingName) {
                throw new Error('User with this name already exists');
            }

            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: userData,
            });

            // Clear cache after updating
            await userService.clearUserCache();

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

            // Clear cache after deleting
            await userService.clearUserCache();

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
