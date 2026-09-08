const db = require("../config/db");

const getAllEmployees = async ({
  page = 1,
  limit = 10,
  search = "",
  departmentId = "",
  status = ""
}) => {
  const offset = (page - 1) * limit;

  let whereClause = "WHERE 1 = 1";
  const queryParams = [];

  if (search) {
    whereClause += `
      AND (
        e.employeeCode LIKE ?
        OR e.fullName LIKE ?
        OR e.email LIKE ?
        OR e.designation LIKE ?
      )
    `;

    const searchValue = `%${search}%`;

    queryParams.push(
      searchValue,
      searchValue,
      searchValue,
      searchValue
    );
  }

  if (departmentId) {
    whereClause += " AND e.departmentId = ?";
    queryParams.push(Number(departmentId));
  }

  if (status) {
    whereClause += " AND e.status = ?";
    queryParams.push(status);
  }

  const [rows] = await db.execute(
    `
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
    ${whereClause}
    ORDER BY e.id
    LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `,
    queryParams
  );

  const [countRows] = await db.execute(
    `
    SELECT COUNT(*) AS total
    FROM employees e
    JOIN departments d
      ON e.departmentId = d.id
    ${whereClause}
    `,
    queryParams
  );

  return {
    employees: rows,
    total: Number(countRows[0].total)
  };
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