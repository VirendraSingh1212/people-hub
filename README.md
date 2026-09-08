# People Hub REST API

People Hub is a RESTful Employee Management API built using Node.js, Express.js, and MySQL.

The API provides CRUD operations for employees and departments with validation, error handling, and a relational database structure.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- REST API
- dotenv
- CORS
- Nodemon

---

## Project Structure

```text
people-hub/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── departmentController.js
│   └── employeeController.js
│
├── models/
│   ├── departmentModel.js
│   └── employeeModel.js
│
├── routes/
│   ├── departmentRoutes.js
│   └── employeeRoutes.js
│
├── middlewares/
├── utils/
├── postman/
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── people-hub.sql
└── README.md