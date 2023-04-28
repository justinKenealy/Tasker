const db = require('./index');

const getAllComments = () => {
    return db
        .query("SELECT * FROM comments;")
        .then((result) => result.rows);
};

const getCommentsByUserId = (id) => {
    return db
        .query("SELECT * FROM comments WHERE user_id = $1;", [id])
        .then((result) => result.rows);
};

const getCommentsByTaskId = (taskId) => {
    return db
        .query("SELECT comments.*, users.user_name FROM comments JOIN users ON comments.user_id = users.id WHERE comments.task_id = $1;", [taskId])
        .then((result) => result.rows);
};

const createComment = (user_id, user_name, task_id, description, creation_date) => {
    return db
        .query(
            "INSERT INTO comments (user_id, user_name, task_id, description, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;", 
            [user_id, user_name, task_id, description, creation_date]
        )
        .then((result) => result.rows[0]);
};

const updateCommentById = (id, user_id, user_name, task_id, description, creation_date) => {
    return db
        .query(
            "UPDATE comments SET user_id = $2, task_id = $3, description = $4, creation_date = $5 WHERE id = $1 RETURNING *;",
            [id, user_id, user_name, task_id, description, creation_date]
        )
        .then((result) => result.rows[0]);
};

const deleteCommentById = (id) => {
    return db
        .query("DELETE FROM comments WHERE id = $1", [id])
        .then(() => {});
};

module.exports = {
    getAllComments,
    getCommentsByUserId,
    getCommentsByTaskId,
    createComment,
    updateCommentById,
    deleteCommentById
};