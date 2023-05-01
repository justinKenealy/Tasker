import renderNotes from './renderNotes.js'

const deleteNote = (user_id, id, noteDiv) => {
  axios
    .delete(`/api/notes/${id}`)
    .then((res) => {
      noteDiv.remove()
      renderNotes(user_id)
    })
    .catch((err) => {
      console.error(err)
    })
}

export default deleteNote
