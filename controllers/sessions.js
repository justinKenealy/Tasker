//Contains all API route definations for sessions

const express = require('express')
const bcrypt = require('bcrypt')
const { getUserByEmail } = require('../models/user')
const router = express.Router()

const comparePassword = (password, password_hash) => {
    const result = bcrypt.compareSync(password, password_hash)
    return result
}

router.post('/session', async (req,res,next) => {
    try{
        const {email, password} = Object.entries(req.body).reduce((obj, [key, value])=>{
            obj[key] = value.trim()
            return obj
        }, {})
    
        if (!email || !password) {
            const customError = new Error("The email or password is missing.");
            customError.status = 400;
            return next(customError);
        }
    
        const user = await getUserByEmail(email)
        if(user){
            if(comparePassword(password, user.password_hash)){
                delete user.password_hash
                req.session.user = user
                console.log('matched!')
                return res.status(200).json({
                    message: 'Logged in successfully.'
                })
            }
        } 
        const customError = new Error("Sorry, invalid email or password.")
        customError.status = 400
        return next(customError)
    }catch (err){
        next(err)
    }
})

router.get('/session',(req,res,next)=>{
    const { user } = req.session
    if(!user){
       return res.status(401).json({
        message: 'Not Logged in'
       })
    }
    return res.status(200).json({user})
})


router.delete('/session', async (req,res,next) => {
    req.session.destroy(()=>{
        return res.status(200).json({
            message:'Logged out'
        })
    })
})
module.exports = router