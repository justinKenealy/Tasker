TRUNCATE TABLE users;
TRUNCATE TABLE projects;
TRUNCATE TABLE tasks;
TRUNCATE TABLE comments;
TRUNCATE TABLE notes;


ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE tasks_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;
ALTER SEQUENCE notes_id_seq RESTART WITH 1;


INSERT INTO users (user_name, first_name, last_name, email, password_hash, friends_array)
VALUES ('cookie_mons', 'Cookie', 'Monster', 'cookie@gmail.com', '$2b$10$Dv8wFSRH1hp5TNtE2smZGeLtDH8E32qgbHC75Rz8jbUP/RN0uuF3m', ARRAY['abc@gmail.com', 'bonn@gmail.com']),
       ('Bon','Porada', 'Thonglong', 'bonn@gmail.com', 'password1', NULL),
       ('Justin', 'Justin', 'Kenealy', 'justin@gmail.com', 'password2', NULL),
       ('Munsat', 'Munsat', 'Rukaya', 'munsat@gmail.com', 'password3', NULL),
       ('Tania', 'Tania', 'Hosseini', 'tania@gmail.com', 'password4', NULL);

INSERT INTO projects (user_id, collab, category, name, task_type)
VALUES (1, ARRAY[1, 2, 3, 4], 'work', 'Build SPA App', 'group'),
       (2, ARRAY[1], 'personal', 'Learn new recipe', 'single'),
       (3, ARRAY[1], 'study', 'Prepare for new content', 'single');

INSERT INTO tasks (project_id, name, description, creation_date, due_date, due_time, priority_level, status)
VALUES (1, 'Set up development environment', 'This task involves setting up the necessary software and tools required for the development of the project.', '2023-04-22', '2023-04-23', '10:00:00', 1, 1),
       (1, 'Design app wireframes', 'The goal of this task is to create wireframes for the user interface of the new mobile app.', '2023-04-23', '2023-04-25', '12:00:00', 2, 1),
       (1, 'Develop login functionality', 'This task involves creating a secure and user-friendly login system for the application.', '2023-04-25', '2023-04-27', '14:00:00', 3, 0),
       (1, 'Create dashboard page', 'This task involves designing and developing a dashboard page for the project.', '2023-04-27', '2023-04-30', '16:00:00', 4, 0),
       (2, 'Watch online tutorials', 'This will help get some knowledge on cooking', '2023-04-23', '2023-04-25', '10:00:00', 1, 1),
       (2, 'Buy ingredients', 'The list of ingredients includes vegetables, spices, meat.', '2023-04-26', '2023-04-28', '12:00:00', 2, 0),
       (2, 'Cook the dish', 'Make sure to follow food safety guidelines, use appropriate cooking techniques.', '2023-04-28', '2023-04-30', '14:00:00', 3, 0),
       (3, 'Review course material', 'write some notes', '2023-04-24', '2023-04-25', '16:00:00', 1, 1),
       (3, 'Complete all the Labs', 'tick off labs that have been completed', '2023-04-28', '2023-04-30', '18:00:00', 2, 0);

INSERT INTO comments (user_id, user_name, task_id, description, creation_date) 
VALUES (1, 'cookie_mons', 1, 'This task was completed perfectly.', '2022-04-25'),
       (1, 'cookie_mons', 1, 'I appreciate your help on this task.', '2022-04-26'),
       (1, 'cookie_mons', 1, 'Can you please provide more details about this task?', '2022-04-26');


INSERT INTO notes (user_id, title, description, creation_date)
VALUES (1, 'Meeting notes', 'Notes from our meeting on 4/25', '2023-04-25'),
       (1, 'Ideas for app', 'Brainstorming ideas for new features', '2023-04-27'),
       (1, 'Project review', 'Important topics to review for the project', '2023-04-30');
