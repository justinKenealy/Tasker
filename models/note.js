const db = require('./index');

const getAllNotes = () => {
    return db
    .query("SELECT * FROM notes;")
    .then((result) => result.rows)
}

const getNotesByUserId = (id) => {
    return db
    .query("SELECT * FROM notes where user_id= $1;", [id])
    .then((result) => result.rows);
  };

const createNote = ( user_id, title, description, creation_date) => {
    return db
    .query(
        "INSERT INTO notes ( user_id, title, description, creation_date) VALUES($1, $2, $3, $4) RETURNING *;", 
        [user_id, title, description, creation_date]
        )
    .then((result) => result.rows[0])
  };

const updateNoteById = (id, user_id, title, description, creation_date) => {
    return db
    .query(
        "UPDATE notes SET user_id = $2, title = $3, description = $4, creation_date = $5 WHERE id = $1 RETURNING *;",
        [id, user_id, title, description, creation_date]
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
