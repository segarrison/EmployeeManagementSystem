INSERT INTO department (dep_name)
VALUES ("Human Resources"),
       ("Engineering"),
       ("Information Technology"),
       ("Business");

INSERT INTO role (title, salary, dep_id)
VALUES ("HR Manager", 70000.00, 1),
       ("HR Team", 50000.00, 1),
       ("Engineering Manager", 120000.00, 2),
       ("Engineering Team", 85000.00, 2),
       ("IT Manager", 100000.00, 3),
       ("IT Team", 75000.00, 3),
       ("Business Manager", 150000.00, 4),
       ("Business Team", 70000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leia", "Organa", 7, NULL),
       ("Mon", "Mothma", 8, 1),
       ("Obi-Wan", "Kenobi", 1, NULL),
       ("C3", "P0", 2, 3),
       ("Luke", "Skywalker", 3, NULL),
       ("Wedge", "Antilles", 4, 5),
       ("Chewbacca", "Wookie", 5, NULL),
       ("R2", "D2", 6, 7 );
