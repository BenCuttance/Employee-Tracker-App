const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2');
const express = require('express');
const { Console } = require('console');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CONNECTING TO DATABASE

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Cutty1998!',
        database: 'database_db'
    },
    console.log('Connected to database')
);

// PROMPTS FOR QUESTIONS ON NPM START

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
        name: 'opening'
    },
]

// ADD EMPLOYEE TO DATABASE FUNCTION
function addEmployee() {
    db.query('SELECT id, title, salary FROM role', function (err, results) {

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
                choices: results.map((element) => { return { name: `${element.title} (${element.salary})`, value: element.id } }),
                
                name: 'employeeRole'
            }
        ]
        inquirer.prompt(employeeAdd).then(answers => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.employeeRole}, 1)`)
            console.log(`${answers.firstName}, ${answers.lastName},  added to list`),

            ask()
        
        }
        )
    })

}

// UPDATED EMPLOYEE FUNCTION
function updateEmployee() {
    db.query('SELECT * FROM employee JOIN role on employee.role_id = role.id', function (err, results1){
        console.log()
        console.table(results1)
        db.query('SELECT * FROM role', function (err, results2){
        const employeeUpdate = [
            {
                type: 'list',
                message: 'Who would you like to update?',
                choices: results1.map((element) => { return { name: `${element.first_name} ${element.last_name}`, value: element.id } }),
                name:'updatedEmployee'

            },
     
            { 
                type: 'list',
                message: 'What is their new role?',
                choices: results2.map((element) => { return { name: `${element.title}`, value: element.id } }),
                name: 'updatedRole'

            }
        ]

        inquirer.prompt(employeeUpdate).then(answers => {
           
            db.query(`UPDATE employee 
            SET role_id = ${answers.updatedRole} 
            WHERE id = ${answers.updatedEmployee} `)
            console.log(`Department id is now set to ${answers.updatedRole}`),
            
           
            ask()
        })
        })
    })
}


// ADD ROLE FUNCTION
function addRole() {
    db.query('SELECT id, title, salary FROM role  ', function (err, results) {
       

        const roleAdd = [
            {
                type: 'input',
                message: "What is the name of the role?",
                name: 'roleName'
            },
            {
                type: 'list',
                message: "What is the salary of the role?",
                choices: ['40000', '45000', '50000', '55000', '60000'],
                name: 'salary'
            },
            {
                type: 'list',
                message: "What department does this role belong to?",
                choices: ['English', 'Maths', 'Science', 'Media', 'Physical Ed', 'Management'],
                name: 'department'
            }
        ]
        inquirer.prompt(roleAdd).then(answers => {
            db.query(`INSERT INTO role (title, salary)
         VALUES ('${answers.roleName}', '${answers.salary}')`)
            console.log(`${answers.roleName}, Salary: ${answers.salary},Under ${answers.department} department added to role`),
                
            ask()
            
            
        }
        )
    })

}

// ADD DEPARTMENT FUNCTION

function addDepartment() {
    db.query('SELECT id, title, salary FROM role', function (err, results) {

        const departmentAdd = [
            {
                type: 'input',
                message: "What is the name of the department",
                name: 'newDepartment'
            },
        
        ]
        inquirer.prompt(departmentAdd).then(answers => {
            db.query(`INSERT INTO department (name)
         VALUES ('${answers.newDepartment}')`)
            console.log(`${answers.newDepartment} added to department list`),

            ask()
            
        }
        )
    })

}
// SHUT DOWN COUNTER ON EXIT FUNCTION
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


// FUNCTION TO ASK QUESTION VIA INQUIRER
function ask() {
    inquirer.prompt(questions).then(answers => {
        switch (answers.opening) {
            case 'View All Employees': {

                db.query('SELECT employee.id AS ID, employee.first_name As First_Name, employee.last_name AS Last_Name, title, salary, employee.manager_id, CONCAT (manager.first_name, " ", manager.last_name) AS Manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ', function (err, results) {
                    console.log(err)
                    console.log()
                    console.table(results)
                })
                ask();
                 break;
            }
            case 'View All Roles': {
                
                db.query('SELECT id AS ID, title as Title, salary as Salary FROM role', function (err, results) {
                    console.log()
                    console.table(results)

                })
                ask();
                break;
            }

            case 'Update Employee Role': {

                updateEmployee();
                
                break;

            }

            case 'Add Role': {
                
                addRole();
               
               
                break;
            }
            case 'Add Employee': {

                addEmployee()
            
                break;

            }
            case 'View All Departments': {

                db.query('Select id as ID, name as Department FROM department', function (err, results) {
                    console.log()
                    console.table(results)
                });
                ask(); break;
            }

            case 'Add Department': {
                addDepartment();
                ask();
            
                break;
            }
            case 'Exit': {
                shutDown()
                return;
            }
            
            default: console.log('Default beep boop')
                 
        }
        
    })
}


// CALLS ASK FUNCTION ON NPM START
ask()

