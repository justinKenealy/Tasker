const db = require("./index")

const getProjectsByUser = (user_id) => {
    return db.query(`
        SELECT id, user_id, category, name, task_type 
        FROM projects 
        WHERE user_id = ${user_id} OR ${user_id} = ANY(collab)
        `)
        .then(result => result.rows);
}

const createProject = (user_id, collab, category, name, task_type) => {
    const sql = 'INSERT INTO projects (user_id, collab, category, name, task_type) VALUES($1, $2, $3, $4, $5) RETURNING id;';
    return db.query(sql, [user_id, collab, category, name, task_type])
}   

const deleteProject = (id) => {
    return db.query('DELETE from projects WHERE id=$1', [id])
}

const updateProject = (collab, category, name, task_type, id) => {
    const sql = `UPDATE projects SET collab = $1, category = $2, name = $3, task_type = $4 WHERE id = $5;`
    return db.query(sql, [collab, category, name, task_type, id])
}

module.exports = {
    getProjectsByUser,
    createProject,
    updateProject,
    deleteProject
}