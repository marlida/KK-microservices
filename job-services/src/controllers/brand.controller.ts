import { Request, Response } from 'express';
import { brandService } from '../services/brand.service';

export const createBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'ข้อมูลแบรนด์ไม่ถูกต้อง',
            });
            return;
        }

        const existingBrand = await brandService.getBrandExists(name);
        if (existingBrand) {
            res.status(400).json({
                message: 'แบรนด์นี้มีอยู่แล้ว',
            });
            return;
        }

        const newBrand = await brandService.createBrand({ name });
        res.status(201).json({
            message: 'สร้างแบรนด์สำเร็จ',
            data: newBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการสร้างแบรนด์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการสร้างแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};

export const getBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const brandData = await brandService.getBrand();
        res.status(200).json({
            message: 'ดึงข้อมูลแบรนด์สำเร็จ',
            data: brandData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
}

export const getBrandById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { catId, prodId, include } = req.query;

        const options = {
            catId: catId ? parseInt(catId as string) : undefined,
            prodId: prodId ? parseInt(prodId as string) : undefined,
            include: include as 'categories' | 'products' | 'both' || undefined
        };

        const brand = await brandService.getBrandById(parseInt(id), options);
        
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
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};

export const updateBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'จำเป็นต้องมี ID และชื่อแบรนด์',
            });
            return;
        }

        const brandNotFound = await brandService.getBrandById(parseInt(id));
        if (!brandNotFound) {
            res.status(404).json({
                message: 'ไม่พบแบรนด์ที่มี ID นี้',
            });
            return;
        }

        const updatedBrand = await brandService.updateBrand(parseInt(id), { name });
        res.status(200).json({
            message: 'อัปเดตแบรนด์สำเร็จ',
            data: updatedBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการอัปเดตแบรนด์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการอัปเดตแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};

export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'จำเป็นต้องมี ID แบรนด์',
            });
            return;
        }

        const deletedBrand = await brandService.deleteBrand(parseInt(id));
        res.status(200).json({
            message: 'ลบแบรนด์สำเร็จ',
            data: deletedBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการลบแบรนด์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'เกิดข้อผิดพลาดในการลบแบรนด์: ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
            });
        }
    }
};
