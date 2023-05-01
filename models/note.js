const db = require('./index');

const getAllNotes = () => {
    return db
    .query("SELECT * FROM notes ORDER BY time DESC;")
    .then((result) => result.rows)
}

const getNotesByUserId = (id) => {
    return db
    .query("SELECT * FROM notes where user_id= $1 ORDER BY time DESC;", [id])
    .then((result) => result.rows);
  };

const createNote = ( user_id, title, description) => {
    return db
    .query(
        "INSERT INTO notes ( user_id, title, description) VALUES($1, $2, $3) RETURNING *;", 
        [user_id, title, description]
        )
    .then((result) => result.rows[0])
  };

const updateNoteById = (id, title, description ) => {
    return db
    .query(
        "UPDATE notes SET title = $2, description = $3, time = NOW() WHERE id = $1 RETURNING *;",
        [id, title, description]
        )
    .then((result) => result.rows[0])
  };

const deletetNoteById = (id) => {
    return db
    .query("DELETE from notes WHERE id=$1", [id])
    .then(() => {});
  };

module.exports = {
    getAllNotes,
    getNotesByUserId,
    createNote,
    updateNoteById,
    deletetNoteById
};
