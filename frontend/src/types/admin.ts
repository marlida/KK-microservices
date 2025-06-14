import { z } from "zod";

export interface Admin {
    id: number;
    name: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
}

export const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "ชื่ออย่างน้อย 2 ตัวอักษร" })
        .max(50, { message: "ชื่อไม่เกิน 50 ตัวอักษร" }),
    tel: z
        .string()
        .min(10, { message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก" })
        .max(10, { message: "เบอร์โทรศัพท์ต้องไม่เกิน 10 หลัก" }),
});