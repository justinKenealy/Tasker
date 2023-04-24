const notes = document.getElementById('renderNotesPage')
    notes.addEventListener('click', (user) => {
        console.log(user.id)
        const user_id = user.id
        return renderNotes(user_id)
    })

const renderNotes = (user_id) => {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    axios.get(`/api/notes/${user_id}`)
    .then(response => {
        const notes = response.data
        notes.forEach(note => {
            const noteDiv = document.createElement('div')
            noteDiv.classList.add("note")
            noteDiv.id = note.id

            const titleSpan = document.createElement('span')
            titleSpan.textContent = note.title
            noteDiv.appendChild(titleSpan)

            const description = document.createElement('div')
            description.classList.add("description")
            description.style.display = 'none'
            description.textContent = note.description

            noteDiv.addEventListener("click", () => {
                if(description.style.display === 'none') {
                    description.style.display = 'block'
                } else {
                    description.style.display ='none'
                }
            })
            noteDiv.appendChild(description)
            mainContent.appendChild(noteDiv)
        })
    })
    .catch(error => console.error(error))
}

export default renderNotes