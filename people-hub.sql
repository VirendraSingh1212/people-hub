
-- People Hub Database


CREATE DATABASE IF NOT EXISTS people_hub;

USE people_hub;


-- Departments Table


DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Departments Seed Data


INSERT INTO departments (departmentName)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Finance'),
    ('Marketing');


-- Employees Table


CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeCode VARCHAR(20) UNIQUE,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    mobile VARCHAR(15),
    departmentId INT,
    designation VARCHAR(100),
    salary DECIMAL(10,2),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (departmentId)
        REFERENCES departments(id)
);


-- Employees Seed Data


INSERT INTO employees (
    employeeCode,
    fullName,
    email,
    mobile,
    departmentId,
    designation,
    salary,
    status
)
VALUES (
    'EMP001',
    'Virendra Singh',
    'virendra.singh@example.com',
    '9999999999',
    1,
    'Full Stack Developer',
    600000.00,
    'Active'
);

-- End of People Hub SQL Script
