INSERT INTO  department (id, name)
VALUES (1, "English"),  
        (2, "Maths"),
        (3, "Science"),
        (4, "Media"),
        (5, "Physical Ed");

INSERT INTO role (id, title, salary, department_id)
VALUES (101, "English Teacher", 50000, 1),
     (102, "Maths Teacher", 55000, 2), 
     (103, "Science Teacher", 60000, 3), 
     (104, "Media Teacher", 45000, 4),
     (105, "P.E Teacher", 40000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (111, 'John', 'Doe', 101, 001),
        (222, 'Walter', 'White', 102, 002), 
        (333, 'Jon', 'Snow', 103, 003),
        (444, 'Daryl', 'Dickson', 104, 004),
        (555, 'Rick', 'Grimes', 105, 005);