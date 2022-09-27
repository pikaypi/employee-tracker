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
    res.json(`${req.method} request received to view departments`);
});

// View all roles
app.get('/api/roles', (req, res) => {
    res.json(`${req.method} received to view employee roles`);
});

// View all employees
app.get('/api/employees', (req, res) => {
    res.json(`${req.method} request received to view employees`);
});

// Add a department
app.post('/api/departments', (req, res) => {
    res.json(`${req.method} request received to add a department`);
});

// Add a role
app.post('/api/roles', (req, res) => {
    res.json(`${req.method} request received to add an employee role`);
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