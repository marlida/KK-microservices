"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAdmin = exports.createAdmin = void 0;
const admin_service_1 = require("../services/admin.service");
const createAdmin = async (req, res) => {
    try {
        const { name, tel } = req.body;
        if (!name || !tel) {
            res.status(400).json({
                message: "ข้อมูลผู้ดูแลระบบไม่ถูกต้อง",
            });
            return;
        }
        const existingAdmin = await admin_service_1.adminService.getAdminExists(name);
        if (existingAdmin) {
            res.status(400).json({
                message: "ผู้ดูแลระบบนี้มีอยู่แล้ว",
            });
            return;
        }
        const newAdmin = await admin_service_1.adminService.createAdmin({ name, tel });
        res.status(201).json({
            message: "สร้างผู้ดูแลระบบสำเร็จ",
            data: newAdmin,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.createAdmin = createAdmin;
const getAdmin = async (req, res) => {
    try {
        const adminData = await admin_service_1.adminService.getAdmin();
        res.status(200).json({
            message: "ดึงข้อมูลผู้ดูแลระบบสำเร็จ",
            data: adminData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.getAdmin = getAdmin;
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "กรุณาระบุรหัสผู้ดูแลระบบ",
            });
            return;
        }
        const adminData = await admin_service_1.adminService.getAdminById(parseInt(id));
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.getAdminById = getAdminById;
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tel } = req.body;
        if (!id || !name || !tel) {
            res.status(400).json({
                message: "ข้อมูลผู้ดูแลระบบไม่ถูกต้อง",
            });
            return;
        }
        const adminNotFound = await admin_service_1.adminService.getAdminById(parseInt(id));
        if (!adminNotFound) {
            res.status(404).json({
                message: "ไม่พบผู้ดูแลระบบ",
            });
            return;
        }
        const existingAdmin = await admin_service_1.adminService.getAdminExists(name);
        if (existingAdmin && existingAdmin.id !== parseInt(id)) {
            res.status(400).json({
                message: "มีผู้ดูแลระบบชื่อนี้อยู่แล้ว",
            });
            return;
        }
        const updatedAdmin = await admin_service_1.adminService.updateAdmin(parseInt(id), {
            name,
            tel,
        });
        res.status(200).json({
            message: "แก้ไขข้อมูลผู้ดูแลระบบสำเร็จ",
            data: updatedAdmin,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "กรุณาระบุรหัสผู้ดูแลระบบ",
            });
            return;
        }
        const deletedAdmin = await admin_service_1.adminService.deleteAdmin(parseInt(id));
        res.status(200).json({
            message: "ลบผู้ดูแลระบบสำเร็จ",
            data: deletedAdmin,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.deleteAdmin = deleteAdmin;
