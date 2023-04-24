const db = require('./index')

const createUser = (user_name, first_name, last_name, email, password_hash) =>{
    const sql = 'INSERT INTO users (user_name, first_name, last_name, email, password_hash) SELECT $1, $2, $3, $4, $5 WHERE NOT EXISTS(SELECT id FROM users WHERE email = $6 OR user_name = $7) RETURNING id;'
    return db.query(sql, [user_name, first_name, last_name, email, password_hash, email, user_name])
    .then(res => res.rows[0])
}

const getUserByEmail = (email) => {
    const sql = 'SELECT id, user_name, first_name, last_name, email, password_hash FROM users WHERE email=$1 LIMIT 1'
    return db.query(sql,[email])
    .then(res => res.rows[0])
}

const getUserById = (id) => {
    const sql = 'SELECT id, user_name, first_name, last_name, email, password_hash FROM users WHERE id=$1 LIMIT 1'
    return db.query(sql,[id])
    .then(res => res.rows[0])
}

const updateUserPassById = (id, password_hash)=>{
    const sql = 'UPDATE users SET password_hash=$1 WHERE id=$2'
    return db.query(sql,[password_hash, id])
    .then(res => res.rowCount)
}

module.exports = {createUser, getUserByEmail, getUserById, updateUserPassById}