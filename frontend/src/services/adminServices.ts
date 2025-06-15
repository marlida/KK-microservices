import { createAdmin, fetchAdminData, updateAdmin, deleteAdmin } from "@/api/admin";
import { Admin } from "@/types/admin";

export class AdminServices {
    static async fetchAdminData() {
        try {
            const res = await fetchAdminData();
            const data = res.data || [];
            if (!data || data.length === 0) {
                throw new Error("ไม่มีข้อมูลผู้ดูแลระบบ");
            }
            return data;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ:", error);
            throw new Error("ไม่สามารถดึงข้อมูลผู้ดูแลระบบได้");
        }
    }    static async createAdmin(adminData: Partial<Admin>) {
        try {
            const res = await createAdmin(adminData);
            return res.message;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ:", error);
            throw new Error("ไม่สามารถสร้างผู้ดูแลระบบได้");
        }
    }

    static async updateAdmin(id: string, adminData: Partial<Admin>) {
        try {
            const res = await updateAdmin(id, adminData);
            return res;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตผู้ดูแลระบบ:", error);
            throw new Error("ไม่สามารถอัปเดตผู้ดูแลระบบได้");
        }
    }

    static async deleteAdmin(id: string) {
        try {
            const res = await deleteAdmin(id);
            return res.message
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตผู้ดูแลระบบ:", error);
            throw new Error("ไม่สามารถอัปเดตผู้ดูแลระบบได้");
        }
      }
}
