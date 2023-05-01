import renderNotes from './renderNotes.js'

const showCreateNoteFormPopup = (user_id) => {
  const displayBg = document.createElement('div')
  displayBg.className = 'display-bg'
  const display = document.createElement('div')
  display.className = 'display'
  displayBg.append(display)
  document.body.prepend(displayBg)

  const cancelIcon = document.createElement('i')
  cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

  const newNoteForm = document.createElement('div')
  newNoteForm.innerHTML = `
      <form id="create-note-form" class="row g-3">
            <div class="col-12">
                <label for="title" class="form-label">Note Title</label>
                <input type="text" name="title" class='form-control' required></input>
            </div>
            <div class="col-12">
                <label for="description" class="form-label">Description</label>
                <textarea name="description" class='form-control' required></textarea>
            </div>
            <input type="hidden" name="user_id" value="${user_id}"></input>
            <div class='d-grid gap-2 col-6 mx-auto'>
                <button type="submit" id="createNoteBtn" class='btn btn-outline-light mt-3 mb-3'>Create Note</button>
            </div>
        </div>
      </form>
    `

  display.appendChild(cancelIcon)
  display.appendChild(newNoteForm)

  cancelIcon.addEventListener('click', () => {
    displayBg.remove()
  })

  const createNoteBtn = document.getElementById('createNoteBtn')
  createNoteBtn.classList = 'btn btn-outline-light mt-3 mb-3'

  const form = newNoteForm.querySelector('#create-note-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const body = {
      user_id: formData.get('user_id'),
      title: formData.get('title'),
      description: formData.get('description'),
    }
    axios
      .post(`/api/notes/`, body)
      .then((res) => {
        displayBg.remove()
        renderNotes(user_id)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

export default showCreateNoteFormPopup
