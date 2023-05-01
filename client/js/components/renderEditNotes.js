import renderNotes from './renderNotes.js'

const showEditNoteFormPopup = (user_id, note) => {
  const displayBg = document.createElement('div')
  displayBg.className = 'display-bg'
  const display = document.createElement('div')
  display.className = 'display'
  displayBg.append(display)
  document.body.prepend(displayBg)

  const cancelIcon = document.createElement('i')
  cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

  const editNoteForm = document.createElement('div')
  editNoteForm.innerHTML = `
      <form id="edit-note-form" class="row g-3">
            <div class="col-12">
                <label for="title" class="form-label">Note Title</label>
                <input type="text" name="title" class='form-control' value="${note.title}"></input>
            </div>
            <div class="col-12">
                <label for="description" class="form-label">Description</label>
                <textarea name="description" class='form-control'>${note.description}</textarea>
            </div>
            <div class='d-grid gap-2 col-6 mx-auto'>
                <button type="submit" id="editNoteBtn" class='btn btn-outline-light mt-3 mb-3'>Update Note</button>
            </div>
        </div>
      </form>
    `

  display.appendChild(cancelIcon)
  display.appendChild(editNoteForm)

  cancelIcon.addEventListener('click', () => {
    displayBg.remove()
  })

  const form = editNoteForm.querySelector('#edit-note-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
    }
    axios
      .put(`/api/notes/${note.id}`, body)
      .then((res) => {
        displayBg.remove()
        renderNotes(user_id)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

export default showEditNoteFormPopup
