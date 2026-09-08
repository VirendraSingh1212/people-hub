const express = require("express");
const departmentController = require("../controllers/departmentController");

const router = express.Router();

router.get("/", departmentController.getAllDepartments);

router.post("/", departmentController.createDepartment);

router.put("/:id", departmentController.updateDepartment);

router.delete("/:id", departmentController.deleteDepartment);

router.get("/:id", departmentController.getDepartmentById);

module.exports = router;