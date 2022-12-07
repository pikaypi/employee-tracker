// Import and require the necessary node modules
const express = require('express');
const mysql = require('mysql2');

// Assign a server port
const PORT = process.env.PORT || 3001;

// Assign the app variable to express()
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    }
);

// View all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, name as Department FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT roles.id, roles.title, departments.name as department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// View all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT
                    employees.id,
                    first_name as "First Name",
                    last_name as "Last Name",
                    roles.title as Title
                FROM employees
                JOIN roles
                WHERE employees.role_id = roles.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Add a department
app.post('/api/departments', (req, res) => {
    const sql = `INSERT INTO departments (name)
    VALUES (?)`;
    const params = req.body.name

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: result
        });
      });
});

// Add a role
app.post('/api/roles', (req, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?)`;
    const params = [req.body.title, req.body.salary, req.body.department_id]

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: req.body
        });
      });
});

// Add an employee
app.post('/api/employees', (req, res) => {
    res.json(`${req.method} request received to add an employee`);
});

// Update an employee
app.put('/api/employees/:id', (req, res) => {
    res.json(`${req.method} request received to update an employee`);
});

// Set the server to listen
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});