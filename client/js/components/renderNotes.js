import showCreateNoteFormPopup from './renderCreateNote.js'
import deleteNote from './renderDeleteNote.js'
import showEditNoteFormPopup from './renderEditNotes.js'

const renderNotes = (user_id) => {
  const display = document.querySelector('.display-bg')
  if (display) {
    display.remove()
  }
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = ''

  axios
    .get(`/api/notes/${user_id}`)
    .then((response) => {
      const notes = response.data
      if (notes.length === 0) {
        mainContent.classList -= 'kanban-notes'
        const noNoteHolder = document.createElement('div')
        noNoteHolder.className = 'no-note-holder'
        const noNote = document.createElement('p')
        noNote.classList.add('no-note')

        //add '+ Add new note' button for adding new note
        const addButton = document.createElement('button')
        addButton.classList.add('add-button')
        addButton.textContent = '+ Add new note'
        addButton.addEventListener('click', () => {
          showCreateNoteFormPopup(user_id)
        })
        noNoteHolder.appendChild(noNote)
        noNoteHolder.appendChild(addButton)
        mainContent.appendChild(noNoteHolder)
        // noNote.appendChild(addButton)
      } else {
        mainContent.className = 'kanban-notes'
        notes.forEach((note, i) => {
          const noteDiv = document.createElement('div')
          noteDiv.classList.add('note')
          noteDiv.id = note.id

          const creationDate = document.createElement('p')
          const date = new Date(note.time).toLocaleDateString()
          const time = new Date(note.time).toLocaleTimeString('en-US')
          creationDate.textContent = `${date}, ${time}`
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

export default renderNotes
