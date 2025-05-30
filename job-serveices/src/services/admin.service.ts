import { Admin, AdminCreateInput } from "../types/admin";
import prisma from "../config/db";

export class adminService {
    static createAdmin = async (adminData: AdminCreateInput): Promise<Admin> => {
        try {
            const newAdmin = await prisma.admin.create({
                data: adminData,
            });
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
            const admins = await prisma.admin.findMany();
            return admins;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving admin data: ${error.message}`);
            } else {
                throw new Error("Error retrieving admin data: Unknown error");
            }
        }
    }

    static getAdminById = async (id: string): Promise<Admin | null> => {
        try {
            const admin = await prisma.admin.findUnique({
                where: { id: Number(id) },
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

    static deleteAdmin = async (id: number): Promise<Admin> => {
        try {
            const deletedAdmin = await prisma.admin.delete({
                where: { id: id },
            });
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