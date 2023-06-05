const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2');
const express = require('express')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'Cutty1998!',
        database: 'database_db'
    },
    console.log('Connected to database')
);

// Prompts for quesions 

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
        name: 'opening'
    },
]

    const employeeAdd = [
        {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choices: ['English Teacher', 'Maths Teacher', 'Science Teacher', 'Media Teacher', 'P.E Teacher', 'Principle'],
            name: 'employeeRole'
        }
    ]
function addEmployee () {
    inquirer.prompt(employeeAdd).then(answers => {
    db.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
     VALUES (999, '${answers.firstName}', '${answers.lastName}', 1, 106)`)
        console.log(`${answers.firstName}, ${answers.lastName} added to list`)
    }
 )}



const shutDown = () => {
    console.log('Shutting Down in...'),
        setTimeout(() => {
            console.log('3')
        }, 1000);

    setTimeout(() => {
        console.log('2')
    }, 2000);

    setTimeout(() => {
        console.log('1')
    }, 3000);

    setTimeout(() => {
        console.log('Good Bye!')
    }, 4000);

}


function ask() {
    inquirer.prompt(questions).then(answers => {
        switch (answers.opening) {
            case 'View All Employees': {
              // NEED TO ADD DEPARTMENT AND SALARY TO QUERY
                db.query('SELECT id AS ID, first_name As First_Name, last_name AS Last_Name FROM employee', function (err, results){
                    console.log(results)
                })
                    ask(); break;
            }
            case 'View All Roles': {
                // NEED TO ADD DEPARTMENT TO QUERY
                db.query('SELECT id AS ID, title as Title, salary as Salary', function (err, results){
                    console.log(results)
                })
                ask(); break; 
            }
            case 'Add Employee': {
                // AUTO INCREMENT FEATURE?
                addEmployee(); break;
                
            }
            case 'View All Departments': {
                
                db.query('Select id as ID, name as Department FROM department', function (err, results){
                    console.log(results)
                });
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

