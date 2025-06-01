import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, tel } = req.body;
    if (!name || !tel) {
      res.status(400).json({
        message: "ข้อมูลผู้ดูแลระบบไม่ถูกต้อง",
      });
      return;
    }

    const existingAdmin = await adminService.getAdminExists(name);
    if (existingAdmin) {
      res.status(400).json({
        message: "ผู้ดูแลระบบนี้มีอยู่แล้ว",
      });
      return;
    }

    const newAdmin = await adminService.createAdmin({ name, tel });
    res.status(201).json({
      message: "สร้างผู้ดูแลระบบสำเร็จ",
      data: newAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
      });
    }
  }
};

export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminData = await adminService.getAdmin();
    res.status(200).json({
      message: "ดึงข้อมูลผู้ดูแลระบบสำเร็จ",
      data: adminData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
      });
    }
  }
};

export const getAdminById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "กรุณาระบุรหัสผู้ดูแลระบบ",
      });
      return;
    }

    const adminData = await adminService.getAdminById(parseInt(id));
    if (!adminData) {
      res.status(404).json({
        message: "ไม่พบผู้ดูแลระบบ",
      });
      return;
    }

    res.status(200).json({
      message: "ดึงข้อมูลผู้ดูแลระบบสำเร็จ",
      data: adminData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
      });
    }
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, tel } = req.body;

    if (!id || !name || !tel) {
      res.status(400).json({
        message: "ข้อมูลผู้ดูแลระบบไม่ถูกต้อง",
      });
      return;
    }

    const adminNotFound = await adminService.getAdminById(parseInt(id));
    if (!adminNotFound) {
      res.status(404).json({
        message: "ไม่พบผู้ดูแลระบบ",
      });
      return;
    }

    const existingAdmin = await adminService.getAdminExists(name);
    if (existingAdmin && existingAdmin.id !== parseInt(id)) {
      res.status(400).json({
        message: "มีผู้ดูแลระบบชื่อนี้อยู่แล้ว",
      });
      return;
    }

    const updatedAdmin = await adminService.updateAdmin(parseInt(id), {
      name,
      tel,
    });
    res.status(200).json({
      message: "แก้ไขข้อมูลผู้ดูแลระบบสำเร็จ",
      data: updatedAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
      });
    }
  }
};

export const deleteAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "กรุณาระบุรหัสผู้ดูแลระบบ",
      });
      return;
    }

    const deletedAdmin = await adminService.deleteAdmin(parseInt(id));
    res.status(200).json({
      message: "ลบผู้ดูแลระบบสำเร็จ",
      data: deletedAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
      });
    }
  }
};
