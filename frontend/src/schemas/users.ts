import { z } from "zod";

// User Create Schema
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อ")
    .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อต้องไม่เกิน 100 ตัวอักษร")
    .regex(/^[a-zA-Zก-๙\s]+$/, "ชื่อต้องเป็นตัวอักษรเท่านั้น"),
  
  tel: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
    .refine((val) => val.startsWith("0"), "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0"),
});

// User Update Schema
export const updateUserSchema = z.object({
  id: z.string().min(1, "ID ไม่ถูกต้อง"),
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อ")
    .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อต้องไม่เกิน 100 ตัวอักษร")
    .regex(/^[a-zA-Zก-๙\s]+$/, "ชื่อต้องเป็นตัวอักษรเท่านั้น"),
  
  tel: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
    .refine((val) => val.startsWith("0"), "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0"),
});

// Type exports
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
