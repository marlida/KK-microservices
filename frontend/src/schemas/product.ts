import { z } from "zod";

// Product Create Schema
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อสินค้า")
    .min(2, "ชื่อสินค้าต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อสินค้าต้องไม่เกิน 100 ตัวอักษร"),
  
  price: z
    .number()
    .min(0, "ราคาต้องมากกว่าหรือเท่ากับ 0")
    .positive("ราคาต้องเป็นจำนวนบวก"),
  
  serial: z
    .string()
    .min(1, "กรุณากรอกหมายเลขซีเรียล")
    .max(50, "หมายเลขซีเรียลต้องไม่เกิน 50 ตัวอักษร"),
  
  quantity: z
    .number()
    .min(0, "จำนวนต้องมากกว่าหรือเท่ากับ 0")
    .int("จำนวนต้องเป็นจำนวนเต็ม"),

  sold: z
    .number()
    .min(0, "จำนวนต้องมากกว่าหรือเท่ากับ 0")
    .int("จำนวนต้องเป็นจำนวนเต็ม"),
  
  description: z
    .string()
    .min(1, "กรุณากรอกคำอธิบายสินค้า")
    .max(500, "คำอธิบายต้องไม่เกิน 500 ตัวอักษร"),
  
  categoryId: z
    .number()
    .min(1, "กรุณาเลือกหมวดหมู่")
    .int("หมวดหมู่ต้องเป็นจำนวนเต็ม"),
  
  brandId: z
    .number()
    .min(1, "กรุณาเลือกแบรนด์")
    .int("แบรนด์ต้องเป็นจำนวนเต็ม"),
});

// Product Update Schema
export const updateProductSchema = z.object({
  id: z.string().min(1, "ID ไม่ถูกต้อง"),
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อสินค้า")
    .min(2, "ชื่อสินค้าต้องมีอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อสินค้าต้องไม่เกิน 100 ตัวอักษร"),
  
  price: z
    .number()
    .min(0, "ราคาต้องมากกว่าหรือเท่ากับ 0")
    .positive("ราคาต้องเป็นจำนวนบวก"),
  
  serial: z
    .string()
    .min(1, "กรุณากรอกหมายเลขซีเรียล")
    .max(50, "หมายเลขซีเรียลต้องไม่เกิน 50 ตัวอักษร"),
  
  quantity: z
    .number()
    .min(0, "จำนวนต้องมากกว่าหรือเท่ากับ 0")
    .int("จำนวนต้องเป็นจำนวนเต็ม"),

  sold: z
    .number()
    .min(0, "จำนวนต้องมากกว่าหรือเท่ากับ 0")
    .int("จำนวนต้องเป็นจำนวนเต็ม"),
  
  description: z
    .string()
    .min(1, "กรุณากรอกคำอธิบายสินค้า")
    .max(500, "คำอธิบายต้องไม่เกิน 500 ตัวอักษร"),
  
  categoryId: z
    .number()
    .min(1, "กรุณาเลือกหมวดหมู่")
    .int("หมวดหมู่ต้องเป็นจำนวนเต็ม"),
  
  brandId: z
    .number()
    .min(1, "กรุณาเลือกแบรนด์")
    .int("แบรนด์ต้องเป็นจำนวนเต็ม"),
});

// Type exports
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
