//Contains all API route definations for users
const axios = require('axios')
const express = require('express')
const bcrypt = require('bcrypt')
const {
    createUser,
    getUserById,
    updateUserPassById,
    updateFriendsListById,
    getUserByEmail,
    deleteFriendByUsernameFromUser,
    getMultipleUsersByEmail,
} = require('../models/user')

const router = express.Router()
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
const comparePassword = (password, password_hash) => {
    const result = bcrypt.compareSync(password, password_hash)
    return result
}

router.post('/users', async (req, res, next) => {
    try {
        //Verify captcha
        const captchaResponse = req.body['g-recaptcha-response']
        const captchaVerification = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${captchaResponse}`)
        if (captchaVerification.data.success === true){
            const { username, firstname, lastname, email, password1, password2 } =
            Object.entries(req.body).reduce((obj, [key, value]) => {
                obj[key] = value.trim()
                return obj
            }, {})

        if (
            !username ||
            !firstname ||
            !lastname ||
            !email ||
            !password1 ||
            !password2
        ) {
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

        const userRes = await createUser(
            username,
            firstname,
            lastname,
            email,
            passwordHash
        )
        if (!userRes) {
            const customError = new Error(
                'The email address or username is already used by an existing user. Try Loggin in.'
            )
            customError.status = 409
            return next(customError)
        }
        const user = {
            id: userRes.id,
            user_name: username,
            first_name: firstname,
            last_name: lastname,
            email,
        }

        req.session.user = user
        return res.status(200).json({ user })
        }else{
            const customError = new Error('Please complete the recaptcha challenge to proceed.')
            customError.status = 409
            return next(customError)
        }
    } catch (err) {
        next(err)
    }
})

router.put('/users/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        if (req.body.hasOwnProperty('passwordOld')) {
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
        } else {
            const { friends_email } = req.body
            const userRow = await updateFriendsListById(id, friends_email)
            if (userRow === 0) {
                return res.status(404).json({
                    message: 'Sorry, cannot add this email as friend',
                })
            }
            const user = await getUserById(id)
            delete user.password_hash
            req.session.user = user
            return res.status(200).json({
                message: 'Successfully added to your friend list.',
            })
        }
    } catch (err) {
        next(err)
    }
})

router.get('/users/:email', async (req, res, next) => {
    try {
        const email = req.params.email
        const user = await getUserByEmail(email)
        return res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
})

router.put('/users/:id/:friend_email', async (req, res, next) => {
    try {
        const friendsEmail = req.params.friend_email
        const id = Number(req.params.id)
        console.log(friendsEmail)
        const userRow = await deleteFriendByUsernameFromUser(id, friendsEmail)
        if (userRow === 0) {
            return res.sendStatus(404)
        }
        const user = await getUserById(id)
        delete user.password_hash
        req.session.user = user
        return res.status(200).json({
            message: 'Deleted successfully.',
        })
    } catch (err) {
        next(err)
    }
})

// get multiple users by email
router.post('/users/multiple', async (req, res, next) => {
    try {
        const users = await getMultipleUsersByEmail(req.body)
        const IDs = []
        for (let user of users){
            IDs.push(user.id)
        }
        return res.status(200).json({ IDs })
    } catch (err) {
        next(err)
    }
})

module.exports = router
