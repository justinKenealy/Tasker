const db = require('./index')

const createUser = (user_name, first_name, last_name, email, password_hash) =>{
    const sql = 'INSERT INTO users (user_name, first_name, last_name, email, password_hash) SELECT $1, $2, $3, $4, $5 WHERE NOT EXISTS(SELECT id FROM users WHERE email = $6 OR user_name = $7) RETURNING id;'
    return db.query(sql, [user_name, first_name, last_name, email, password_hash, email, user_name])
    .then(res => res.rows[0])
}

const getUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email=$1 LIMIT 1'
    return db.query(sql,[email])
    .then(res => res.rows[0])
}

const getMultipleUsersByEmail = (emailsArray) => {
    console.log(emailsArray[0])
    console.log(emailsArray[1])
    usersArrayAsQuery = `WHERE email = '${emailsArray[0]}'`
    for (let i=1; i<(emailsArray.length); i++){
        usersArrayAsQuery+=` OR email = '${emailsArray[i]}'`
    }
    const sql = `SELECT id FROM users ${usersArrayAsQuery};`
    console.log(sql)
    return db.query(sql)
    .then(res => res.rows)
}

const getUserById = (id) => {
    const sql = 'SELECT * FROM users WHERE id=$1 LIMIT 1'
    return db.query(sql,[id])
    .then(res => res.rows[0])
}

const updateUserPassById = (id, password_hash)=>{
    const sql = 'UPDATE users SET password_hash=$1 WHERE id=$2'
    return db.query(sql,[password_hash, id])
    .then(res => res.rowCount)
}

const updateFriendsListById = (id, friends_email)=>{
    const sql = 'UPDATE users SET friends_array = ARRAY_APPEND(friends_array, $1) WHERE (id=$2) AND NOT ($3 = ANY(friends_array))'
    return db.query(sql,[friends_email, id, friends_email])
    .then(res => res.rowCount)
}

const deleteFriendByUsernameFromUser = (id, friends_email) =>{
    const sql = 'UPDATE users SET friends_array = ARRAY_REMOVE(friends_array, $1) WHERE id=$2'
    // const sql = 'SELECT ARRAY_REMOVE((SELECT friends_array FROM users WHERE id=$1), $2)'
    return db.query(sql,[friends_email, id])
    .then(res => res.rowCount)
}

module.exports = {createUser, getUserByEmail, getMultipleUsersByEmail, getUserById, updateUserPassById, updateFriendsListById, deleteFriendByUsernameFromUser}