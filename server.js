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

// const addEmpQ = [
//   {
//     type: "input",
//     message: "What is the employee's first name?",
//     name: "newFirst",
//   },
//   {
//     type: "input",
//     message: "What is the employee's last name?",
//     name: "newLast",
//   },
//   {
//     type: "list",
//     message: "What is the employee's role?",
//     name: "newEmpRole",
//     choices: roles,
//   },
//   {
//     type: "list",
//     message: "Who is the employee's manager?",
//     name: "newEmpMgr",
//     choices: managers,
//   },
// ];

// const addRoleQ = [
//   {
//     type: "input",
//     message: "What is the name of the role?",
//     name: "newRole",
//   },
//   {
//     type: "number",
//     message: "What is the salary of the role?",
//     name: "newSal",
//   },
//   {
//     type: "list",
//     message: "Which department does the role belong to?",
//     name: "roleDept",
//     choices: departments,
//   },
// ];

const addDeptQ = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "newDept",
  },
];

function viewAllEmp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.error(err);
    } else {
      //console.table('Employees', res) for title row?
      console.table(res);
      runMenu();
    }
  });
}

function addEmp() {
  console.log("Add employee selected");
  connection
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id"
    )
    .then((res) => {
      managers = res.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });
      console.log(managers);
      roles = res.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
    })
    // connection.query("SELECT id, title FROM role", function (err, res) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     roles = res.map((role) => {
    //       return {
    //         name: role.title,
    //         value: role.id,
    //       };
    //     });
    //   }
    // });
    // console.log(roles);
    // connection.query(
    //   "SELECT id, first_name, last_name FROM employee",
    //   function (err, res) {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       managers = res.map((manager) => {
    //         return {
    //           name: `${manager.first_name} ${manager.last_name}`,
    //           value: manager.id,
    //         };
    //       });
    //     }
    //   }
    // );
    // console.log(managers);
    .then(
      inquirer.prompt([
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
          choices: roles,
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "newEmpMgr",
          choices: managers,
        },
      ])
    )
    .then((answers) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.newFirst}", "${res.newLast}", "${res.newEmpRole}", "${res.newEmpMgr}")`,
        function (err, results) {
          if (err) {
            console.error(err);
          } else {
            console.log("Employee has been added to database");
            runMenu();
          }
        }
      );
    })
    .catch((err) => {
      throw err;
    });
}

function updateEmpRole() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) {
        console.error(err);
      } else {
        const updateEmpChoice = res.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
      }
    }
  );
  connection.query("SELECT id, title FROM role", function (err, res) {
    if (err) {
      console.error(err);
    } else {
      const updateRoleChoice = res.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
    }
  });
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee needs to be updated?",
        name: "updateEmp",
        choices: updateEmpChoice,
      },
      {
        type: "list",
        message: "What is the updated employee role?",
        name: "updateRole",
        choices: updateRoleChoice,
      },
    ])
    .then((answers) => {
      connection.query(
        `UPDATE employee SET role_id = ${answers.updateRole} WHERE id=${answers.updateRole}`,
        function (err, results) {
          if (err) {
            console.error(err);
          } else {
            console.log("Employee role has been updated");
            runMenu();
          }
        }
      );
    });
}

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.table(res);
      runMenu();
    }
  });
}

function addRole() {
  connection
    .promise()
    .query("SELECT id, dept_name FROM department")
    .then(res => {
      
      const departments = res.map((department) => {
        return {
          name: department.dept_name,
          value: department.id,
        };
        
      });
      console.log(departments);
      return departments;
    })

    .then((departments) => {
      console.log("ask a question");
     return inquirer.prompt([
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
          name: "roleDept",
          choices: departments,
        },
      ]);
    })
    .then((answers) => {
      connection
        .query(
          `INSERT INTO role (title, salary, dept_id) VALUES ("${answers.newRole}", "${answers.newSal}", "${answers.roleDept}")`
        )
        .then((results) => {
          console.log("Role has been added to database");
          runMenu();
        });
    })
    .catch((err) => {
      throw err;
    });
}

function viewAllDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.table(res);
      runMenu();
    }
  });
}

function addDept() {
  inquirer.prompt(addDeptQ).then((answers) => {
    connection.query(
      `INSERT INTO department (dept_name) VALUES ("${answers.newDept}")`,
      function (err, results) {
        if (err) {
          console.error(err);
        } else {
          console.log("Department has been added to database");
          runMenu();
        }
      }
    );
  });
}
function runMenu() {
  inquirer.prompt(dbMenu).then((selection) => {
    switch (selection.mainMenu) {
      case "View All Employees":
        viewAllEmp();
        break;

      case "Add Employee":
        addEmp();
        break;

      case "Update Employee Role":
        updateEmpRole();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "View All Departments":
        viewAllDept();
        break;

      case "Add Department":
        addDept();
        break;

      case "Quit":
        connection.end();
        console.log("Thank you for using Employee Management System");
        break;
    }
  });
}
function init() {
  runMenu();
}
init();
