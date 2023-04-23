DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS notes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL 
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  user_id INT,
        CONSTRAINT fk_projects_users
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
  collab INT[],
  category TEXT, 
  name VARCHAR(255) NOT NULL,
  task_type TEXT

);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INT,
        CONSTRAINT fk_tasks_projects
        FOREIGN KEY(project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creation_date DATE,
  due_date DATE, 
  due_time TIME,
  priority_level INT, 
  status INT
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
        CONSTRAINT fk_comments_users
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
  task_id INT,
        CONSTRAINT fk_comments_tasks
        FOREIGN KEY(task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  creation_date DATE
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
    user_id INT,
        CONSTRAINT fk_notes_users
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  creation_date DATE
);
