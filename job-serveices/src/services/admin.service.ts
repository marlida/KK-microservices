import { Admin, AdminCreateInput } from "../types/admin";
import prisma from "../config/db";
import redisClient from "../config/redis";

export class adminService {
    private static clearAdminCache = async () => {
        await redisClient.del("admin:list");
    }

    private static clearAdminCacheById = async (id: number) => {
        await redisClient.del(`admin:${id}`);
    }

    static createAdmin = async (adminData: AdminCreateInput): Promise<Admin> => {
        try {
            const newAdmin = await prisma.admin.create({
                data: adminData,
            });

            await this.clearAdminCache();

            return newAdmin;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating admin: ${error.message}`);
            } else {
                throw new Error("Error creating admin: Unknown error");
            }
        }
    }

    static getAdmin = async (): Promise<Admin[]> => {
        try {
            const cached = await redisClient.get(`admin:list`);

            if (cached) {
                console.log("Returning cached admin data");
                return JSON.parse(cached);
            }
            const admins = await prisma.admin.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            // Cache the new admin data
            await redisClient.set(`admin:list`, JSON.stringify(admins), {
                EX: 60 * 60, // Cache for 1 hour
            });
            console.log("Admin data cached");
            return admins;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving admin data: ${error.message}`);
            } else {
                throw new Error("Error retrieving admin data: Unknown error");
            }
        }
    }

    static getAdminById = async (id: number): Promise<Admin | null> => {
        try {
            const cached = await redisClient.get(`admin:${id}`);
            if (cached) {
                console.log("Returning cached admin data by ID");
                return JSON.parse(cached);
            }
            const admin = await prisma.admin.findUnique({
                where: { id: id },
            });

            if (!admin) {
                console.log(`Admin with ID ${id} not found`);
                return null;
            }

            await redisClient.set(`admin:${id}`, JSON.stringify(admin), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return admin;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving admin by ID: ${error.message}`);
            } else {
                throw new Error("Error retrieving admin by ID: Unknown error");
            }
        }
    }

    static getAdminExists = async (name: string): Promise<Admin | null> => {
        try {
            const admin = await prisma.admin.findMany({
                where: { name: String(name) },
            });
            return admin[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving admin by name: ${error.message}`);
            } else {
                throw new Error("Error retrieving admin by name: Unknown error");
            }
        }
    }

    static updateAdmin = async (id: number, adminData: AdminCreateInput): Promise<Admin> => {
        try {
            const updatedAdmin = await prisma.admin.update({
                where: { id: id },
                data: adminData,
            });
            await this.clearAdminCacheById(id);
            return updatedAdmin;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating admin: ${error.message}`);
            } else {
                throw new Error("Error updating admin: Unknown error");
            }
        }
    }

    static deleteAdmin = async (id: number): Promise<Admin> => {
        try {
            const deletedAdmin = await prisma.admin.delete({
                where: { id: id },
            });
            await this.clearAdminCache();
            return deletedAdmin;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting admin: ${error.message}`);
            } else {
                throw new Error("Error deleting admin: Unknown error");
            }
        }
    }
}

