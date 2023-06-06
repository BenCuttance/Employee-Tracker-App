INSERT INTO  department ( name)
VALUES ( "English"),  
        ( "Maths"),
        ( "Science"),
        ( "Media"),
        ("Physical Ed"),
        ( "Management");

INSERT INTO role ( title, salary, department_id)
VALUES ( "English Teacher", 50000, 1),
     ( "Maths Teacher", 55000, 2), 
     ( "Science Teacher", 60000, 3), 
     ( "Media Teacher", 45000, 4),
     ( "P.E Teacher", 40000, 5),
     ( 'Principle', 99999999, 6);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ( 'John', 'Doe', 1, null),
        ( 'Walter', 'White', 2, 1), 
        ( 'Jon', 'Snow', 3, 1),
        ( 'Daryl', 'Dickson', 4, 1),
        ( 'Rick', 'Grimes', 5, 1),
        ( 'Ben', 'Cuttance', 6, 1);