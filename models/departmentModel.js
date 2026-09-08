const db = require("../config/db");

const getAllDepartments = async () => {
  const [rows] = await db.execute(`
    SELECT
      id,
      departmentName,
      createdAt
    FROM departments
    ORDER BY id;
  `);

  return rows;
};

const getDepartmentById = async (id) => {
  const [rows] = await db.execute(`
    SELECT
      id,
      departmentName,
      createdAt
    FROM departments
    WHERE id = ?;
  `, [id]);

  return rows[0];
};

const createDepartment = async (departmentName) => {
  const [result] = await db.execute(
    `
    INSERT INTO departments (departmentName)
    VALUES (?)
    `,
    [departmentName]
  );

  return result.insertId;
};

const updateDepartment = async (id, departmentName) => {
  const [result] = await db.execute(
    `
    UPDATE departments
    SET departmentName = ?
    WHERE id = ?
    `,
    [departmentName, id]
  );

  return result;
};

const deleteDepartment = async (id) => {
  const [result] = await db.execute(
    `
    DELETE FROM departments
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};