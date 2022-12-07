// Import and require the necessary node modules
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { validateStr, validateNum } = require('./helpers/validate');

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
                    id as ID, 
                    name as Department 
                FROM departments`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result)
            menu()
        }
    })
}

const viewAllRoles = () => {
    const sql = `SELECT
                    roles.id as ID,
                    roles.title as Title,
                    departments.name as Department,
                    roles.salary as Salary
                FROM roles
                JOIN departments
                WHERE roles.department_id = departments.id`;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result)
            menu()
        };
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT
                    employees.id as ID,
                    first_name as "First Name",
                    last_name as "Last Name",
                    departments.name as Department,
                    roles.title as Title,
                    roles.salary as Salary,
                    manager_id as "Manager ID"
                FROM employees
                JOIN roles, departments
                WHERE employees.role_id = roles.id
                AND roles.department_id = departments.id`;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result)
            menu()
        };
    });
};

const addDepartment = () => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;

    inquirer.prompt([
        {
            type: 'input',
            message: 'Department Name:',
            name: 'name',
            validate: function (input) {
                return validateStr(input)
            }
        }
    ])
    .then((res) => {
        db.query(sql, res.name, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Successfully added ${res.name} to departments`);
                menu();
            };
        });
    });
};

const addRole = () => {
    const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;
    const params = [req.body.title, req.body.salary, req.body.department_id]

    inquirer.prompt([
        {
            type: 'input',
            message: 'Role Title:',
            name: 'title',
            validate: function (input) {
                validateStr(input)        
            }
        },
        {
            type: 'number',
            message: 'Salary:',
            name: 'salary',
            validate: function (input) {
                validateNum(input)
            }
        },
        {
            type: 'number',
            message: 'Department ID:',
            name: 'department_id',
            validate: function (input) {
                validateNum(input)
            }
        }
    ])
    .then((res) => {
        db.query(sql, [res.title, res.salary, res.department_id], (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Successfully added ${res.title} to roles`);
                menu();
            };
        });
    });
};

const addEmployee = () => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;

    inquirer.prompt([
        {
            type: 'input',
            message: 'First Name:',
            name: 'first_name',
            validate: function (input) {
                validateStr(input)
            }
        },
        {
            type: 'input',
            message: 'Last Name:',
            name: 'last_name',
            validate: function (input) {
                validateStr(input)
            }
        },
        {
            type: 'number',
            message: 'Role ID:',
            name: 'role_id',
            validate: function (input) {
                validateNum(input)
            }
        },
        {
            type: 'number',
            message: 'Manager ID:',
            name: 'manager_id',
            validate: function (input) {
                validateNum(input)
            }
        }
    ])
    .then((res) => {
        db.query(sql, [res.first_name, res.last_name, res.role_id, res.manager_id], (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Successfully added ${res.first_name} ${res.last_name} to employees`);
                menu();
            };
        });
    });
};

const updateEmployee = () => {
    db.query('SELECT * FROM employees', (err, employeesRows) => {
        if (err) {
            console.error(err);
        } else {
            inquirer.prompt([
                {
                    type: 'list',
                    message: `Which employee's role would you like to update?`,
                    name: 'employee',
                    choices: employeesRows.map((employee) => `${employee.id}: ${employee.first_name} ${employee.last_name}`)
                }
            ]).then((data) => {
                const employee = {
                    id: data.employee.split(':')[0],
                    name: data.employee.split(':')[1].trim()
                }
                db.query(`SELECT * FROM employees WHERE id = ?`, employee.id, (err, employee_id) => {
                    if (err) {
                        console.error(err);
                    } else {
                        db.query(`SELECT * FROM roles`, (err, allRoles) => {
                            if (err) {
                                console.error(err);
                            } else {
                                inquirer.prompt([
                                    {
                                        type: 'list',
                                        message: `What should ${employee.name}'s new role be?`,
                                        name: 'newRole',
                                        choices: allRoles.map((role) => `${role.id}: ${role.title}`)
                                    }
                                ]).then((res) => {
                                    const newRole = {
                                        id: res.newRole.split(':')[0],
                                        title: res.newRole.split(':')[1].trim()
                                    }
                                    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRole.id, employee.id], (err, res) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log(`${employee.name} is now a ${newRole.title}`);
                                            menu();
                                        }
                                    })
                                })
                            };
                        });
                    };
                });
            });
        };
    });
};

// Set the server to listen
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

// Call the menu to run when the application starts
menu()