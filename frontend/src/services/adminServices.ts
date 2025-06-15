import { createAdmin, fetchAdminData } from "@/api/admin";

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
    }

    static async createAdmin(adminData: any) {
        try {
            const res = await createAdmin(adminData);
            return res.message;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ:", error);
            throw new Error("ไม่สามารถสร้างผู้ดูแลระบบได้");
        }
    }

    //   async updateAdmin(id: string, adminData: any) {
    //     return await updateAdmin(id, adminData);
    //   }

    //   async deleteAdmin(id: string) {
    //     return await deleteAdmin(id);
    //   }
}
