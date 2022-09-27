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

// View all roles

// View all employees

// Add a department

// Add a role

// Add an employee

// Update an employee

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});