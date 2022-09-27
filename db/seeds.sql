INSERT INTO departments (name)
VALUES ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Service');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Service Lead', 100000, 5),
    ('Customer Service', 70000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Anna', 'Applebaum', 1),
    ('Brian', 'Beaudet', 2),
    ('Caroline', 'Chretien', 3),
    ('Doug', 'Danvers', 4),
    ('Emma', 'Eastman', 5),
    ('Frank', 'Fortier', 6),
    ('Gina', 'Gadsby', 7),
    ('Henry', 'Hughes', 8),
    ('Irma', 'Ingalls', 9),
    ('Jeffrey', 'Jones', 10)