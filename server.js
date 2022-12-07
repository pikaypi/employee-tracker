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

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department'
            ]
        }
    ])
    .then((res) => {
        switch (res.choice) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break; 
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;       
            default:
                break;
        }
    })
}

const viewAllDepartments = () => {
    const sql = `SELECT 
                    id, 
                    name 
                FROM departments`;

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
    const sql = `SELECT
                    roles.id,
                    roles.title,
                    departments.name as department,
                    roles.salary
                FROM roles
                JOIN departments
                WHERE roles.department_id = departments.id`;

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

    db.query(sql, req.body.name, (err, result) => {
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
    const sql = `INSERT INTO employees (firt_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;

    db.query(sql, [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id], (err, result) => {
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

// Update an employee
app.put('/api/employees/:id', (req, res) => {
    const sql = `UPDATE employees 
                SET role_id = ? 
                WHERE id = ?`
    const params = [req.body.role_id, req.params.id]

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

// Set the server to listen
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});