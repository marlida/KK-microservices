import { createUser, fetchUserData, updateUser, deleteUser } from "@/api/users";
import { User } from "@/types/user";

export class UserServices {
    static async fetchUserData() {
        try {
            const res = await fetchUserData();
            const data = res.data || [];
            if (!data || data.length === 0) {
                throw new Error("ไม่มีข้อมูลผู้ใช้");
            }
            return data;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
            throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        }
    }

    static async createUser(userData: Partial<User>) {
        try {
            const res = await createUser(userData);
            return res.message;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้:", error);
            throw new Error("ไม่สามารถสร้างผู้ใช้ได้");
        }
    }

    static async updateUser(id: string, userData: Partial<User>) {
        try {
            const res = await updateUser(id, userData);
            return res;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตผู้ใช้:", error);
            throw new Error("ไม่สามารถอัปเดตผู้ใช้ได้");
        }
    }

    static async deleteUser(id: string) {
        try {
            const res = await deleteUser(id);
            return res.message
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลบผู้ใช้:", error);
            throw new Error("ไม่สามารถลบผู้ใช้ได้");
        }
    }
}
