INSERT INTO users (name, email, password_hash)
VALUES ('Bon', 'bonn@gmail.com', 'password1'),
       ('Justin', 'justin@gmail.com', 'password2'),
       ('Munsat', 'munsat@gmail.com', 'password3'),
       ('Tania', 'tania@gmail.com', 'password4');

INSERT INTO projects (user_id, collab, category, name, task_type)
VALUES (1, ARRAY[1, 2, 3, 4], 'work', 'Build SPA App', 'group'),
       (2, ARRAY[1], 'personal', 'Learn new recipe', 'single'),
       (3, ARRAY[1], 'study', 'Prepare for new content', 'single');

INSERT INTO tasks (project_id, description, creation_date, due_date, due_time, priority_level, status)
VALUES (1, 'Set up development environment', '2023-04-22', '2023-04-23', '10:00:00', 1, 1),
       (1, 'Design app wireframes', '2023-04-23', '2023-04-25', '12:00:00', 2, 1),
       (1, 'Develop login functionality', '2023-04-25', '2023-04-27', '14:00:00', 3, 0),
       (1, 'Create dashboard page', '2023-04-27', '2023-04-30', '16:00:00', 4, 0),
       (2, 'Watch online tutorials', '2023-04-23', '2023-04-25', '10:00:00', 1, 1),
       (2, 'Buy ingredients', '2023-04-26', '2023-04-28', '12:00:00', 2, 0),
       (2, 'Cook the dish', '2023-04-28', '2023-04-30', '14:00:00', 3, 0),
       (3, 'Review course material', '2023-04-24', '2023-04-25', '16:00:00', 1, 1),
       (3, 'Complete all the Labs', '2023-04-28', '2023-04-30', '18:00:00', 2, 0);

INSERT INTO comments (user_id, task_id, title, description, creation_date)
VALUES (3, 1, 'Initial thoughts', 'This is a great start!', '2023-04-22'),
       (1, 1, 'Agree', 'I think so too!', '2023-04-23'),
       (2, 1, 'Feedback', 'I think we need to make some changes', '2023-04-25'),
       (7, 1, 'Suggestions', 'What changes do you suggest?', '2023-04-26');

INSERT INTO notes (user_id, title, description, creation_date)
VALUES (3, 'Meeting notes', 'Notes from our meeting on 4/25', '2023-04-25'),
       (7, 'Ideas for app', 'Brainstorming ideas for new features', '2023-04-27'),
       (2, 'Project review', 'Important topics to review for the project', '2023-04-30');
