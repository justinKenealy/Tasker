const db = require('./index')

const getAllTasks = () => {
    return db.query('SELECT * from tasks;')
        .then(result => result.rows)
}

const getTaskById = (id) => {
    return db.query(`select * from tasks where id = ${id}`)
        // rows is an array of object with all tasks info
        .then(result => result.rows)
}

const createTask = (project_id, description, creation_date, due_date, due_time, priority_level, status) => {
    const sql = `INSERT INTO tasks (project_id, description, creation_date, due_date, due_time, priority_level, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    const values = [project_id, description, creation_date, due_date, due_time, priority_level, status]
    return db.query(sql, values)
        // returns info of task created
        .then(result => result.rows[0])
}


const deleteTaskById = (id) => {
    return db.query('DELETE from tasks WHERE id = $1', [id])
}

const editTaskById = (description, due_date, due_time, priority_level, status, id) => {

    const valuesToUpdate = [];
    let paramPosition = 2;
    const params = [id];

    if (description) {
        params.push(description);
        valuesToUpdate.push(`description = $${paramPosition}`);
        paramPosition++;
    }
    if (due_date) {
        params.push(due_date);
        valuesToUpdate.push(`due_date = $${paramPosition}`);
        paramPosition++;
    }
    if (due_time) {
        params.push(due_time);
        valuesToUpdate.push(`due_time = $${paramPosition}`);
        paramPosition++;
    }
    if (priority_level) {
        params.push(priority_level);
        valuesToUpdate.push(`priority_level = $${paramPosition}`);
        paramPosition++;
    }
    if (status) {
        params.push(status);
        valuesToUpdate.push(`status = $${paramPosition}`);
        paramPosition++;
    }

    const sql = `UPDATE tasks set ${valuesToUpdate.join(', ')} WHERE id =$1;`;
    return db.query(sql, params)

}


module.exports = {
    getAllTasks,
    getTaskById,
    deleteTaskById,
    createTask,
    editTaskById
}
