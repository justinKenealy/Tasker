const renderNotes = (user_id) => {
    const display = document.querySelector('.display-bg')
    if (display) {
        display.remove()
    }
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''
    mainContent.className = 'kanban-notes'

    axios
        .get(`/api/notes/${user_id}`)
        .then((response) => {
            const notes = response.data

            if (notes.length === 0) {
                const noNote = document.createElement('p')
                noNote.classList.add('no_note')
                noNote.textContent = 'No note found.'

                //add '+ Add new note' button for adding new note
                const addButton = document.createElement('button')
                addButton.classList.add('add-button')
                addButton.textContent = '+ Add new note'
                addButton.addEventListener('click', () => {
                    showCreateNoteFormPopup(user_id)
                })
                mainContent.appendChild(noNote)
                noNote.appendChild(addButton)
            } else {
                

                notes.forEach((note, i) => {
                    const noteDiv = document.createElement('div')
                    noteDiv.classList.add('note')
                    noteDiv.id = note.id

                    const creationDate = document.createElement('p')
                    const date = new Date(
                        note.creation_date
                    ).toLocaleDateString()
                    creationDate.textContent = date
                    creationDate.classList.add('creationDate')
                    noteDiv.appendChild(creationDate)

                    const title = document.createElement('p')
                    title.textContent = note.title
                    title.classList.add('note_title')
                    noteDiv.appendChild(title)

                    const description = document.createElement('div')
                    description.classList.add('description')
                    description.style.display = 'none'
                    description.textContent = note.description

                    //add event listener to show more details
                    noteDiv.addEventListener('click', () => {
                        if (description.style.display === 'none') {
                            description.style.display = 'block'
                        } else {
                            description.style.display = 'none'
                        }
                    })

                    noteDiv.appendChild(description)
                    mainContent.appendChild(noteDiv)

                    //add 'Delete' button for deleting a note
                    const deleteNoteBtn = document.createElement('i')
                    deleteNoteBtn.className = 'fa-solid fa-trash'
                    deleteNoteBtn.addEventListener('click', () => {
                        deleteNote(user_id, note.id, noteDiv)
                    })
                    noteDiv.appendChild(deleteNoteBtn)

                    //add 'Edit' button for editing a note
                    const editNoteBtn = document.createElement('i')
                    editNoteBtn.className = 'fa-solid fa-pen-to-square'
                    editNoteBtn.addEventListener('click', () => {
                        showEditNoteFormPopup(user_id, note)
                    })

                    noteDiv.appendChild(editNoteBtn)

                    //add '+ Add new note' button for adding new note
                    if (i === notes.length - 1) {
                        const addButton = document.createElement('button')
                        addButton.classList.add('add-button')
                        addButton.textContent = '+ Add new note'
                        addButton.addEventListener('click', () => {
                            showCreateNoteFormPopup(user_id)
                        })
                        mainContent.prepend(addButton)
                    }
                })
            }
        })
        .catch((error) => console.error(error))
}

const showCreateNoteFormPopup = (user_id) => {
    const display = document.createElement('div')
    display.className = 'display'
    document.body.prepend(display)

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const newNoteForm = document.createElement('div')
    const creation_date = moment().format('YYYY-MM-DD')
    newNoteForm.innerHTML = `
      <form id="create-note-form">
        <div class="popup-content">
          <p>
            <label for="title">Note Title</label></br>
            <input type="text" name="title"></input>
          </p>
          <p>
            <label for="description">Description</label><br>
            <textarea name="description"></textarea>
          </p>
          
          <input type="hidden" name="creation_date" value="${creation_date}"></input>
          <input type="hidden" name="user_id" value="${user_id}"></input>
  
          <button type="submit" id="createNoteBtn">Create Note</button>
        </div>
      </form>
    `

    display.appendChild(cancelIcon)
    display.appendChild(newNoteForm)

    cancelIcon.addEventListener('click', () => {
        display.remove()
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
            creation_date: formData.get('creation_date'),
        }
        axios
            .post(`/api/notes/`, body)
            .then((res) => {
                console.log(res)
                display.remove()
                renderNotes(user_id)
            })
            .catch((err) => {
                console.error(err)
            })
    })
}

const showEditNoteFormPopup = (user_id, note) => {
    const display = document.createElement('div')
    display.className = 'display'
    document.body.prepend(display)

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const editNoteForm = document.createElement('div')
    editNoteForm.innerHTML = `
      <form id="edit-note-form">
        <div class="popup-content">
          <p>
            <label for="title">Note Title</label></br>
            <input type="text" name="title" value="${note.title}"></input>
          </p>
          <p>
            <label for="description">Description</label><br>
            <textarea name="description">${note.description}</textarea>
          </p>
  
          <input type="hidden" name="creation_date" value="${note.creation_date}"></input>
          <input type="hidden" name="user_id" value="${user_id}"></input>
  
          <button type="submit" id="editNoteBtn">Update Note</button>
        </div>
      </form>
    `

    display.appendChild(cancelIcon)
    display.appendChild(editNoteForm)

    cancelIcon.addEventListener('click', () => {
        display.remove()
    })

    const editNoteBtn = document.getElementById('editNoteBtn')
    editNoteBtn.classList = 'btn btn-outline-light mt-3 mb-3'

    const form = editNoteForm.querySelector('#edit-note-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const body = {
            user_id: formData.get('user_id'),
            title: formData.get('title'),
            description: formData.get('description'),
            creation_date: formData.get('creation_date'),
        }
        axios
            .put(`/api/notes/${note.id}`, body)
            .then((res) => {
                console.log(res)
                display.remove()
                renderNotes(user_id)
            })
            .catch((err) => {
                console.error(err)
            })
    })
}

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

export default renderNotes
