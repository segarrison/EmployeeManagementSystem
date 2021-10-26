DROP DATABASE IF EXISTS employeemanagementsys_db;
CREATE DATABASE IF NOT EXISTS employeemanagementsys_db;

USE employeemanagementsys_db;

CREATE TABLE IF NOT EXISTS department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2) NOT NULL,
    dep_id INT,
    FOREIGN KEY (dep_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);