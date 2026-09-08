const departmentModel = require("../models/departmentModel");

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch departments"
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await departmentModel.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error("Error fetching department:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch department"
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;

    if (!departmentName) {
      return res.status(400).json({
        success: false,
        message: "Department name is required"
      });
    }

    const departmentId =
      await departmentModel.createDepartment(departmentName);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      departmentId
    });
  } catch (error) {
    console.error("Error creating department:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create department"
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    if (!departmentName) {
      return res.status(400).json({
        success: false,
        message: "Department name is required"
      });
    }

    const result = await departmentModel.updateDepartment(
      id,
      departmentName
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully"
    });
  } catch (error) {
    console.error("Error updating department:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update department"
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await departmentModel.deleteDepartment(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting department:", error.message);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        success: false,
        message:
          "Cannot delete department because employees are assigned to it"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete department"
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};