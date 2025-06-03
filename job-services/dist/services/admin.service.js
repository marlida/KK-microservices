"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importDefault(require("../config/redis"));
class adminService {
}
exports.adminService = adminService;
_a = adminService;
adminService.clearAdminCache = async () => {
    await redis_1.default.del("admin:list");
};
adminService.clearAdminCacheById = async (id) => {
    await redis_1.default.del(`admin:${id}`);
};
adminService.createAdmin = async (adminData) => {
    try {
        const newAdmin = await db_1.default.admin.create({
            data: adminData,
        });
        await _a.clearAdminCache();
        return newAdmin;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
        else {
            throw new Error("Error creating admin: Unknown error");
        }
    }
};
adminService.getAdmin = async () => {
    try {
        const cached = await redis_1.default.get(`admin:list`);
        if (cached) {
            console.log("Returning cached admin data");
            return JSON.parse(cached);
        }
        const admins = await db_1.default.admin.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        // Cache the new admin data
        await redis_1.default.set(`admin:list`, JSON.stringify(admins), {
            EX: 60 * 60, // Cache for 1 hour
        });
        console.log("Admin data cached");
        return admins;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving admin data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving admin data: Unknown error");
        }
    }
};
adminService.getAdminById = async (id) => {
    try {
        const cached = await redis_1.default.get(`admin:${id}`);
        if (cached) {
            console.log("Returning cached admin data by ID");
            return JSON.parse(cached);
        }
        const admin = await db_1.default.admin.findUnique({
            where: { id: id },
        });
        if (!admin) {
            console.log(`Admin with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(`admin:${id}`, JSON.stringify(admin), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return admin;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving admin by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving admin by ID: Unknown error");
        }
    }
};
adminService.getAdminExists = async (name) => {
    try {
        const admin = await db_1.default.admin.findMany({
            where: { name: String(name) },
        });
        return admin[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving admin by name: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving admin by name: Unknown error");
        }
    }
};
adminService.updateAdmin = async (id, adminData) => {
    try {
        const updatedAdmin = await db_1.default.admin.update({
            where: { id: id },
            data: adminData,
        });
        await _a.clearAdminCacheById(id);
        await _a.clearAdminCache();
        return updatedAdmin;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating admin: ${error.message}`);
        }
        else {
            throw new Error("Error updating admin: Unknown error");
        }
    }
};
adminService.deleteAdmin = async (id) => {
    try {
        const deletedAdmin = await db_1.default.admin.delete({
            where: { id: id },
        });
        await _a.clearAdminCache();
        return deletedAdmin;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting admin: ${error.message}`);
        }
        else {
            throw new Error("Error deleting admin: Unknown error");
        }
    }
};
