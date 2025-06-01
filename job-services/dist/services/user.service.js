"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importDefault(require("../config/redis"));
class userService {
}
exports.userService = userService;
_a = userService;
userService.clearUserCache = async () => {
    await redis_1.default.del("users:list");
};
userService.clearUserCacheById = async (id) => {
    await redis_1.default.del(`user:${id}`);
};
userService.createUser = async (userData) => {
    try {
        const telephoneExists = await db_1.default.user.findFirst({
            where: {
                tel: userData.tel,
            },
        });
        if (telephoneExists) {
            throw new Error('User with this telephone number already exists');
        }
        const newUser = await db_1.default.user.create({
            data: userData,
        });
        // Clear cache after creating
        await _a.clearUserCache();
        return newUser;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
        else {
            throw new Error("Error creating user: Unknown error");
        }
    }
};
userService.getUser = async () => {
    try {
        // Try to get users from cache
        const cached = await redis_1.default.get("users:list");
        if (cached) {
            console.log("User data retrieved from cache");
            return JSON.parse(cached);
        }
        // If not cached, get from DB
        const users = await db_1.default.user.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        console.log("User data retrieved from database");
        // Cache the result
        await redis_1.default.set("users:list", JSON.stringify(users), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return users;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving user data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving user data: Unknown error");
        }
    }
};
userService.getUserById = async (id) => {
    try {
        const cached = await redis_1.default.get(`user:${id}`);
        if (cached) {
            console.log("Returning cached user data by ID");
            return JSON.parse(cached);
        }
        console.log(`Retrieving user with ID ${id} from database`);
        const user = await db_1.default.user.findUnique({
            where: { id: id }
        });
        if (!user) {
            console.log(`User with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(`user:${id}`, JSON.stringify(user), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving user by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving user by ID: Unknown error");
        }
    }
};
userService.getUserExists = async (name) => {
    try {
        const user = await db_1.default.user.findMany({
            where: { name: String(name) },
        });
        return user[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving user by name: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving user by name: Unknown error");
        }
    }
};
userService.updateUser = async (id, userData) => {
    try {
        const existingName = await db_1.default.user.findFirst({
            where: {
                name: userData.name,
                NOT: { id }
            }
        });
        if (existingName) {
            throw new Error('User with this name already exists');
        }
        const updatedUser = await db_1.default.user.update({
            where: { id: id },
            data: userData,
        });
        // Clear cache after updating
        await _a.clearUserCache();
        return updatedUser;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
        else {
            throw new Error("Error updating user: Unknown error");
        }
    }
};
userService.deleteUser = async (id) => {
    try {
        const deletedUser = await db_1.default.user.delete({
            where: { id: id },
        });
        // Clear cache after deleting
        await _a.clearUserCache();
        return deletedUser;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
        else {
            throw new Error("Error deleting user: Unknown error");
        }
    }
};
