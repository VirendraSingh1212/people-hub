const employeeModel = require("../models/employeeModel");

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    console.error("Error fetching employees:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees"
    });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    const employee = await employeeModel.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error("Error fetching employee:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employee"
    });
  }
};

// Create employee
const createEmployee = async (req, res) => {
  try {
    const {
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status
    } = req.body;

    // Required field validation
    if (
      !employeeCode ||
      !fullName ||
      !email ||
      !mobile ||
      !departmentId ||
      !designation ||
      salary === undefined ||
      salary === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required employee details"
      });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Mobile validation
    const mobilePattern = /^[0-9]{10,15}$/;

    if (!mobilePattern.test(String(mobile))) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must contain 10 to 15 digits"
      });
    }

    // Department ID validation
    if (!Number.isInteger(Number(departmentId)) || Number(departmentId) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Department ID must be a valid positive number"
      });
    }

    // Salary validation
    if (isNaN(Number(salary)) || Number(salary) < 0) {
      return res.status(400).json({
        success: false,
        message: "Salary must be a valid positive number"
      });
    }

    // Status validation
    if (status && !["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either Active or Inactive"
      });
    }

    const employeeId = await employeeModel.createEmployee({
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status: status || "Active"
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employeeId
    });
  } catch (error) {
    console.error("Error creating employee:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Employee code or email already exists"
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Department does not exist"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create employee"
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    const {
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status
    } = req.body;

    // Required field validation
    if (
      !employeeCode ||
      !fullName ||
      !email ||
      !mobile ||
      !departmentId ||
      !designation ||
      salary === undefined ||
      salary === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required employee details"
      });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Mobile validation
    const mobilePattern = /^[0-9]{10,15}$/;

    if (!mobilePattern.test(String(mobile))) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must contain 10 to 15 digits"
      });
    }

    // Department ID validation
    if (!Number.isInteger(Number(departmentId)) || Number(departmentId) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Department ID must be a valid positive number"
      });
    }

    // Salary validation
    if (isNaN(Number(salary)) || Number(salary) < 0) {
      return res.status(400).json({
        success: false,
        message: "Salary must be a valid positive number"
      });
    }

    // Status validation
    if (status && !["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either Active or Inactive"
      });
    }

    const result = await employeeModel.updateEmployee(id, {
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status: status || "Active"
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully"
    });
  } catch (error) {
    console.error("Error updating employee:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Employee code or email already exists"
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Department does not exist"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update employee"
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID"
      });
    }

    const result = await employeeModel.deleteEmployee(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting employee:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete employee"
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};