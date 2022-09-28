const { response } = require('express');
const inquirer = require('inquirer');

class Team {
    constructor(departments, roles, employees) {
        this.departments = departments;
        this.roles = roles;
        this.employees = employees;
    }

    menu() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Please choose an action',
                    name: 'action',
                    choices: [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add an employee role',
                        'Add an employee',
                        `Update an employee's role`
                    ]
                }
            ])
            .then(res => {
                switch (res.action) {
                    case 'View all departments':
                        console.log('This will display the departments');
                        this.menu();
                        break;
                    case 'View all roles':
                        console.log('This will display the roles');
                        this.menu();
                        break;
                    case 'View all employees':
                        console.log('This will display the employees');
                        this.menu();
                        break;
                    case 'Add a department':
                        console.log('This will prompt you to add information for a new department');
                        this.menu();
                        break;
                    case 'Add an employee role':
                        console.log('This will prompt you to add information for a new employee role');
                        this.menu();
                        break;
                    case 'Add an employee':
                        console.log('This will prompt you to add information for a new employee');
                        this.menu();
                        break;
                    case `Update an employee's role`:
                        console.log(`This will prompt you for information to update a specific employee's role`);
                        this.menu();
                        break
                }
            })
    }
};

module.exports = Team;

const menu = new Team();
menu.menu();