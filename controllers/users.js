//Contains all API route definations for users
const express = require('express')
const bcrypt = require('bcrypt')
const {
    createUser,
    getUserById,
    updateUserPassById,
} = require('../models/user')

const router = express.Router()

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
const comparePassword = (password, password_hash) => {
    const result = bcrypt.compareSync(password, password_hash)
    return result
}

router.post('/users', async (req, res, next) => {
    try {
        const { name, email, password1, password2 } = Object.entries(
            req.body
        ).reduce((obj, [key, value]) => {
            obj[key] = value.trim()
            return obj
        }, {})

        if (!name || !email || !password1 || !password2) {
            const customError = new Error(
                'The name, email or password is missing.'
            )
            customError.status = 400
            return next(customError)
        }
        if (password1 !== password2) {
            const customError = new Error(
                'The passwords do not match. Please try again'
            )
            customError.status = 400
            return next(customError)
        }
        if (password1.length < 8) {
            const customError = new Error(
                'The password is too short. It must be 8 characters long.'
            )
            customError.status = 400
            return next(customError)
        }
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (
            !/\d/.test(password1) ||
            !/[A-Z]/.test(password1) ||
            !/[a-z]/.test(password1) ||
            !specialChars.test(password1)
        ) {
            const customError = new Error(
                'The password must contain a combination of uppercase letters, lowercase letters, numbers and symbols.'
            )
            customError.status = 400
            return next(customError)
        }

        const passwordHash = generateHash(password1)

        const user = await createUser(name, email, passwordHash)
        if (!user) {
            const customError = new Error(
                'The email address is already used by an existing user. Try Loggin in.'
            )
            customError.status = 409
            return next(customError)
        }
        return res.status(201).json({
            id: user.id,
            name,
            email,
            passwordHash,
        })
    } catch (err) {
        next(err)
    }
})

router.put('/users/:id', async (req, res, next) => {
    const id = Number(req.params.id)
    const { passwordOld, passwordNew } = req.body
    const user = await getUserById(id)
    if (comparePassword(passwordOld, user.password_hash)) {
        if (passwordNew.length < 8) {
            const customError = new Error(
                'The password is too short. It must be 8 characters long.'
            )
            customError.status = 400
            return next(customError)
        }
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (
            !/\d/.test(passwordNew) ||
            !/[A-Z]/.test(passwordNew) ||
            !/[a-z]/.test(passwordNew) ||
            !specialChars.test(passwordNew)
        ) {
            const customError = new Error(
                'The password must contain a combination of uppercase letters, lowercase letters, numbers and symbols.'
            )
            customError.status = 400
            return next(customError)
        }
        const newPasswordHash = generateHash(passwordNew)
        const userRow = await updateUserPassById(id, newPasswordHash)
        if (userRow === 0) {
            return res.sendStatus(404)
        }
        return res.status(200).json({
            message: 'Updated successfully.',
        })
    }
    const customError = new Error('The old password do not match.')
    customError.status = 400
    return next(customError)
})

module.exports = router
