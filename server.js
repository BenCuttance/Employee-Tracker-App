const inquirer = require('inquirer')
const fs = require('fs')

// Prompts for quesions 

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
        name: 'opening'
    },
    // {
    //     type: 'list',
    //     message: ,
    //     choices: [],
    //     name: ''
    // }
]


const shutDown = () => {
    console.log('Shutting Down in...'),
    setTimeout(() => {
        console.log('3') }, 1000);
    
    setTimeout(() => {
        console.log('2') }, 2000);
       
    setTimeout(() => {
            console.log('1') }, 3000);
           
    setTimeout(() => {
            console.log('Good Bye!') }, 4000);

    }




function ask() {
    inquirer.prompt(questions).then(answers => {
        switch (answers.opening) {
            case 'View All Employees': {
                console.log('Employees Beep Boop'),
                ask(); break;
            }
            case 'Exit': {
                shutDown()
                return;
            }
            default: console.log('Default beep boop'),
            ask(); break;
        }
        
    })
}


ask()

