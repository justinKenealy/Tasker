const express = require('express');
const { 
    getProjectsByUser
    } = require('../models/project');

const router = express.Router();

router.get('/projects/:id', (req, res, next) => {
    const userID = Number(req.params.id);

    return getProjectsByUser(userID)
        .then((result) => {
            res.json(result)
        })
})

module.exports = router;