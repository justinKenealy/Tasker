const express = require('express')
const router = express.Router()
const {
  getAllComments,
  getCommentsByTaskId,
  createComment,
  deleteCommentById,
  updateCommentById,
} = require('../models/comment')

router.get('/comments', (req, res, next) => {
  return getAllComments()
    .then((comments) => res.json(comments))
    .catch((err) => next(err))
})

router.get('/comments/:taskId', (req, res, next) => {
  taskId = Number(req.params.taskId)
  return getCommentsByTaskId(taskId)
    .then((comments) => {
      const sortedComments = comments.sort((a, b) => b.creation_date - a.creation_date)
      res.json(sortedComments)
    })
    .catch((err) => next(err))
})

router.post('/comments', (req, res, next) => {
  const { user_id, user_name, task_id, description, creation_date } = req.body
  return createComment(user_id, user_name, task_id, description, creation_date)
    .then((comment) => res.json(comment))
    .catch((err) => next(err))
})

router.put('/comments/:id', (req, res, next) => {
  const { user_id, user_name, task_id, description, creation_date } = req.body
  const id = Number(req.params.id)
  return updateCommentById(id, user_id, user_name, task_id, description, creation_date)
    .then((comment) => res.json(comment))
    .catch((err) => next(err))
})

router.delete('/comments/:id', (req, res, next) => {
  id = Number(req.params.id)
  return deleteCommentById(id)
    .then(() => res.json({ message: 'Comment deleted successfully' }))
    .catch((err) => next(err))
})

module.exports = router
