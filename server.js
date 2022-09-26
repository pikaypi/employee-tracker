// Import and require the necessary node modules
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Assign a server port
const PORT = process.nextTick.PORT || 3001;

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
        databse: 'employees_db'
    },
    // Dev check that the database was connected
    console.log('Connect to the emploees_db database.')
);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});