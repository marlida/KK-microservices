"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getBrand = exports.createBrand = void 0;
const brand_service_1 = require("../services/brand.service");
const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'ข้อมูลแบรนด์ไม่ถูกต้อง',
            });
            return;
        }
        const existingBrand = await brand_service_1.brandService.getBrandExists(name);
        if (existingBrand) {
            res.status(400).json({
                message: 'แบรนด์นี้มีอยู่แล้ว',
            });
            return;
        }
        const newBrand = await brand_service_1.brandService.createBrand({ name });
        res.status(201).json({
            message: 'สร้างแบรนด์สำเร็จ',
            data: newBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการสร้างแบรนด์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
exports.createBrand = createBrand;
const getBrand = async (req, res) => {
    try {
        const brandData = await brand_service_1.brandService.getBrand();
        res.status(200).json({
            message: 'ดึงข้อมูลแบรนด์สำเร็จ',
            data: brandData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
exports.getBrand = getBrand;
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const { catId, prodId, include } = req.query;
        const options = {
            catId: catId ? parseInt(catId) : undefined,
            prodId: prodId ? parseInt(prodId) : undefined,
            include: include || undefined
        };
        const brand = await brand_service_1.brandService.getBrandById(parseInt(id), options);
        if (!brand) {
            res.status(404).json({
                message: 'ไม่พบแบรนด์',
            });
            return;
        }
        res.status(200).json({
            message: 'ดึงข้อมูลแบรนด์สำเร็จ',
            data: brand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
exports.getBrandById = getBrandById;
const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'จำเป็นต้องมี ID และชื่อแบรนด์',
            });
            return;
        }
        const brandNotFound = await brand_service_1.brandService.getBrandById(parseInt(id));
        if (!brandNotFound) {
            res.status(404).json({
                message: 'ไม่พบแบรนด์ที่มี ID นี้',
            });
            return;
        }
        const updatedBrand = await brand_service_1.brandService.updateBrand(parseInt(id), { name });
        res.status(200).json({
            message: 'อัปเดตแบรนด์สำเร็จ',
            data: updatedBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการอัปเดตแบรนด์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการอัปเดตแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
exports.updateBrand = updateBrand;
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'จำเป็นต้องมี ID แบรนด์',
            });
            return;
        }
        const deletedBrand = await brand_service_1.brandService.deleteBrand(parseInt(id));
        res.status(200).json({
            message: 'ลบแบรนด์สำเร็จ',
            data: deletedBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการลบแบรนด์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการลบแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
exports.deleteBrand = deleteBrand;
