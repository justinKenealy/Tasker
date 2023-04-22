const db = require('./index')

const createUser = (name, email, password_hash) =>{
    const sql = 'INSERT INTO users (name, email, password_hash) SELECT $1, $2, $3 WHERE NOT EXISTS(SELECT id FROM users WHERE email = $4) RETURNING id;'
    return db.query(sql, [name, email, password_hash, email])
    .then(res => res.rows[0])
}

const getUserByEmail = (email) => {
    const sql = 'SELECT id,name,email, password_hash FROM users WHERE email=$1 LIMIT 1'
    return db.query(sql,[email])
    .then(res => res.rows[0])
}

module.exports = {createUser, getUserByEmail}