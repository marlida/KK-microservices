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
        message: "Invalid admin data provided",
      });
      return;
    }

    const existingAdmin = await adminService.getAdminExists(name);
    if (existingAdmin) {
      res.status(400).json({
        message: "Admin already exists",
      });
      return;
    }

    const newAdmin = await adminService.createAdmin({ name, tel });
    res.status(201).json({
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error creating admin: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "Error creating admin: Unknown error",
      });
    }
  }
};

export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminData = await adminService.getAdmin();
    res.status(200).json({
      message: "Admin data retrieved successfully",
      data: adminData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error retrieving admin data: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "Error retrieving admin data: Unknown error",
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
        message: "Admin ID is required",
      });
      return;
    }

    const adminData = await adminService.getAdminById(parseInt(id));
    if (!adminData) {
      res.status(404).json({
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      message: "Admin data retrieved successfully",
      data: adminData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error retrieving admin data: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "Error retrieving admin data: Unknown error",
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
        message: "Invalid admin data provided",
      });
      return;
    }

    const adminNotFound = await adminService.getAdminById(parseInt(id));
    if (!adminNotFound) {
      res.status(404).json({
        message: "Admin not found",
      });
      return;
    }

    const updatedAdmin = await adminService.updateAdmin(parseInt(id), {
      name,
      tel,
    });
    res.status(200).json({
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error updating admin: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "Error updating admin: Unknown error",
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
        message: "Admin ID is required",
      });
      return;
    }

    const deletedAdmin = await adminService.deleteAdmin(parseInt(id));
    res.status(200).json({
      message: "Admin deleted successfully",
      data: deletedAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error deleting admin: ${error.message}`,
      });
    } else {
      res.status(500).json({
        message: "Error deleting admin: Unknown error",
      });
    }
  }
};
