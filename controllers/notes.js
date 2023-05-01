const express = require('express')
const router = express.Router()
const {
  getAllNotes,
  getNotesByUserId,
  createNote,
  deletetNoteById,
  updateNoteById,
} = require('../models/note')

router.get('/notes', (req, res, next) => {
  return getAllNotes()
    .then((notes) => res.json(notes))
    .catch((err) => next(err))
})

router.get('/notes/:id', (req, res, next) => {
  id = Number(req.params.id)
  return getNotesByUserId(id)
    .then((notes) => {
      res.json(notes)
    })
    .catch((err) => next(err))
})

router.post('/notes', (req, res, next) => {
  const { user_id, title, description } = req.body
  id = Number(req.params.id)
  return createNote(user_id, title, description)
    .then((note) => res.json(note))
    .catch((err) => next(err))
})

router.put('/notes/:id', (req, res, next) => {
  const { title, description } = req.body
  id = Number(req.params.id)
  return updateNoteById(id, title, description)
    .then((note) => res.json(note))
    .catch((err) => next(err))
})

router.delete('/notes/:id', (req, res, next) => {
  id = Number(req.params.id)
  return deletetNoteById(id)
    .then(() => res.json({ message: 'Note deleted successfully' }))
    .catch((err) => next(err))
})

module.exports = router
