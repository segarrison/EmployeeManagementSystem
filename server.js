const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot1234",
  database: "employeemanagementsys_db",
});

const dbMenu = [
  {
    type: "list",
    name: "mainMenu",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const addEmpQ =[
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "newFirst",
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "newLast",
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "newEmpRole",
        //need to build this array
        choices: roles,
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "newEmpMgr",
        //need to build this array
        choices: managers,
    },

];

const addRoleQ = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "newRole",
    },
    {
        type: "number",
        message: "What is the salary of the role?",
        name: "newSal",
    },
    {
        type: "list",
        message: "Which department does the role belong to?",
        name: "roleDep",
        //need to build this array
        choices: departments,
    },
];

const addDepQ = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "newDep",
  },
];
