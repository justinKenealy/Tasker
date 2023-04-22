const db = require("./index")

const getProjectsByUser = (user_id) => {
    return db.query(`
        SELECT id, user_id, category, name, task_type 
        FROM projects 
        WHERE user_id = ${user_id} OR ${user_id} = ANY(collab)
        `)
        .then(result => result.rows);
}

module.exports = {getProjectsByUser}