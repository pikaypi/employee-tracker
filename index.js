const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'list',
            message: 'Do you see this message?',
            name: 'continue',
            choices: ['Yes', 'No']
        }
    ])
    .then((data) =>
        console.log(data)
    )