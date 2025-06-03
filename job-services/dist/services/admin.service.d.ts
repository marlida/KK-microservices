import { Admin, AdminCreateInput } from "../types/admin";
export declare class adminService {
    private static clearAdminCache;
    private static clearAdminCacheById;
    static createAdmin: (adminData: AdminCreateInput) => Promise<Admin>;
    static getAdmin: () => Promise<Admin[]>;
    static getAdminById: (id: number) => Promise<Admin | null>;
    static getAdminExists: (name: string) => Promise<Admin | null>;
    static updateAdmin: (id: number, adminData: AdminCreateInput) => Promise<Admin>;
    static deleteAdmin: (id: number) => Promise<Admin>;
}
