const express = require('express')
const {
  getProjectsByUser,
  createProject,
  updateProject,
  deleteProject,
  updateProjectCollab,
} = require('../models/project')

const router = express.Router()

//get project (by user)
router.get('/projects/:id', (req, res, next) => {
  const userID = Number(req.params.id)
  return getProjectsByUser(userID).then((result) => {
    res.json(result)
  })
})

//create new project
router.post('/projects/', (req, res, next) => {
  const { user_id, collab, category, name, task_type } = req.body

  return createProject(user_id, collab, category, name, task_type)
    .then((result) => {
      res.status(201)
      res.json({
        user_id,
        collab,
        category,
        name,
        task_type,
      })
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        message: 'Unexpected server error.',
      })
    })
})

//delete project
router.delete('/projects/:id', (req, res, next) => {
  const id = Number(req.params.id)

  return deleteProject(id)
    .then((result) => {
      if (result.rowCount === 0) {
        const customError = new Error('Cannot find challenge with id: ' + id)
        customError.status = 404
        next(customError)
      } else {
        res.status(204).json({
          message: 'deleted',
        })
      }
    })
    .catch((err) => {
      next(err)
    })
})

//update project details
router.put('/projects/:id', (req, res) => {
  const id = Number(req.params.id)
  // const { collab, category, name, task_type } = req.body;
  // return updateProject(collab, category, name, task_type, id)
  const { name, category } = req.body
  return updateProject(name, category, id).then((result) =>
    res.sendStatus(result.rowCount === 0 ? 404 : 200)
  )
})

//update project collab
router.put('/projects/:user_id', (req, res, next) => {
  const userId = Number(req.params.id)
  return updateProjectCollab(userId).then((res) =>
    res.status(200).json({
      message: 'Successfully added to your friend list.',
    })
  )
})

module.exports = router
