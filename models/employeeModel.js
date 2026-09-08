const db = require("../config/db");

const getAllEmployees = async () => {
  const [rows] = await db.execute(`
    SELECT
      e.id,
      e.employeeCode,
      e.fullName,
      e.email,
      e.mobile,
      e.departmentId,
      d.departmentName,
      e.designation,
      e.salary,
      e.status,
      e.createdAt
    FROM employees e
    JOIN departments d
      ON e.departmentId = d.id
    ORDER BY e.id;
  `);

  return rows;
};

const getEmployeeById = async (id) => {
  const [rows] = await db.execute(`
    SELECT
      e.id,
      e.employeeCode,
      e.fullName,
      e.email,
      e.mobile,
      e.departmentId,
      d.departmentName,
      e.designation,
      e.salary,
      e.status,
      e.createdAt
    FROM employees e
    JOIN departments d
      ON e.departmentId = d.id
    WHERE e.id = ?;
  `, [id]);

  return rows[0];
};

const createEmployee = async (employee) => {
  const {
    employeeCode,
    fullName,
    email,
    mobile,
    departmentId,
    designation,
    salary,
    status
  } = employee;

  const [result] = await db.execute(
    `
    INSERT INTO employees
    (
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status
    ]
  );

  return result.insertId;
};

const updateEmployee = async (id, employee) => {
  const {
    employeeCode,
    fullName,
    email,
    mobile,
    departmentId,
    designation,
    salary,
    status
  } = employee;

  const [result] = await db.execute(
    `
    UPDATE employees
    SET
      employeeCode = ?,
      fullName = ?,
      email = ?,
      mobile = ?,
      departmentId = ?,
      designation = ?,
      salary = ?,
      status = ?
    WHERE id = ?
    `,
    [
      employeeCode,
      fullName,
      email,
      mobile,
      departmentId,
      designation,
      salary,
      status,
      id
    ]
  );

  return result;
};

const deleteEmployee = async (id) => {
  const [result] = await db.execute(
    `
    DELETE FROM employees
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};