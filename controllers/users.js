//Contains all API route definations for users
const express = require('express')
const bcrypt = require('bcrypt');
const { createUser } = require('../models/user');

const router = express.Router()

const generateHash = (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

router.post("/users", async (req, res, next) => {
    try {
      const { name, email, password1, password2 } = Object.entries(req.body).reduce((obj, [key,value])=>{
        obj[key] = value.trim()
        return obj
      },{}) ;
      
  
      if (!name || !email || !password1 || !password2) {
        const customError = new Error("The name, email or password is missing.");
        customError.status = 400;
        return next(customError);
      }
      if (password1 !== password2) {
        const customError = new Error(
          "The passwords do not match. Please try again"
        );
        customError.status = 400;
        return next(customError);
      }
      if (password1.length < 8) {
        const customError = new Error(
          "The password is too short. It must be 8 characters long."
        );
        customError.status = 400;
        return next(customError);
      }
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (
        !/\d/.test(password1) ||
        !/[A-Z]/.test(password1) ||
        !/[a-z]/.test(password1) ||
        !specialChars.test(password1)
      ) {
        const customError = new Error(
          "The password must contain a combination of uppercase letters, lowercase letters, numbers and symbols."
        );
        customError.status = 400;
        return next(customError);
      }
  
      const passwordHash = generateHash(password1);
  
      const user = await createUser(name, email, passwordHash);
      if (!user) {
        const customError = new Error(
          "The email address is already used by an existing user. Try Loggin in."
        );
        customError.status = 409;
        return next(customError);
      }
      return res.status(201).json({
        id: user.id,
        name,
        email,
        passwordHash,
      });
    } catch (err) {
      next(err);
    }
  });
  module.exports = router;
  