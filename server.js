const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2');
const express = require('express')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection(
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


function addEmployee() { 
    db.query('SELECT id, title, salary FROM role', function (err, results){
        console.log(results)
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
                choices: results.map((element)=>{ return {name:`${element.title } (${element.salary})`, value:element.id}}),
                // choices: ['English Teacher', 'Maths Teacher', 'Science Teacher', 'Media Teacher', 'P.E Teacher', 'Principle'],
                name: 'employeeRole'
            }
        ]
        inquirer.prompt(employeeAdd).then(answers => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.employeeRole}, 1)`)
            console.log(`${answers.firstName}, ${answers.lastName}, ${answers.employeeRole} added to list`)
        }
        )
    })
   
}



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

// db.query(`UPDATE employee SET role_id = ${answers.newRole} where employee id = `)

function ask() {
    inquirer.prompt(questions).then(answers => {
        switch (answers.opening) {
            case 'View All Employees': {
                
                db.query('SELECT employee.id AS ID, employee.first_name As First_Name, employee.last_name AS Last_Name, title, salary, employee.manager_id, CONCAT (manager.first_name, " ", manager.last_name) AS Manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ', function (err, results) 
                { console.log(err)
                    console.log()
                    console.table(results)
                })
                ask(); break;
            }
            case 'View All Roles': {
                // NEED TO ADD DEPARTMENT TO QUERY
                db.query('SELECT id AS ID, title as Title, salary as Salary', function (err, results) {
                    console.log(results)
                })
                ask(); break;
            }
            case 'Add Employee': {
                
                addEmployee(); break;

            }
            case 'View All Departments': {

                db.query('Select id as ID, name as Department FROM department', function (err, results) {
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

