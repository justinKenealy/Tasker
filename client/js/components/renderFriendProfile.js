import renderLeftPane from "./renderLeftPane.js"

const renderFriendProfile = (user) => {
    const oldDisplay = document.querySelector('.display-bg')
    if (oldDisplay) {
        oldDisplay.remove()
    }

    user.friends_array.forEach((each) => {
        axios.get(`/api/users/${each}`).then(({ data }) => {
            if (data.user) {
                const userName = data.user.user_name
                const userEmail = data.user.email
                const ul = document.createElement('ul')
                ul.classList = 'list-group '
                const crossBox = document.createElement('i')
                crossBox.classList = `crossbox fa-solid fa-xmark`
                crossBox.dataset.email = userEmail
                crossBox.style.display = 'none'
                const li = document.createElement('li')
                li.classList = 'friend-list'
                li.textContent = `${userName} - ${userEmail}`

                ul.appendChild(li)
                li.append(crossBox)
                friendDiv.appendChild(ul)
            }
        })
    })
    const displayBg = document.createElement('div')
    displayBg.className = 'display-bg'
    const display = document.createElement('div')
    display.className = 'display'
    displayBg.append(display)
    document.body.prepend(displayBg)

    const error = document.createElement('section')
    error.id = 'errors'

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const buttonHolder = document.createElement('div')
    buttonHolder.classList = 'mt-3'


    const addBtn = document.createElement('button')
    addBtn.classList = 'btn btn-outline-light m-2'
    addBtn.textContent = 'Add Friends'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList = 'btn btn-danger m-2'
    deleteBtn.textContent = 'Delete Friends'

    buttonHolder.appendChild(addBtn)
    buttonHolder.appendChild(deleteBtn)

    const form = document.createElement('form')
    form.id = 'add-friends-form'
    form.style.display = 'none'

    const lineHolder = document.createElement('div')
    lineHolder.classList = 'm-3'

    const label = document.createElement('label')
    label.textContent = "Add your friend's Email: "
    label.classList = 'form-label'

    const input = document.createElement('input')
    input.classList = 'form-control'
    input.required = true
    input.type = 'text'
    input.name = 'friends_email'

    const div = document.createElement('div')
    div.classList = 'd-grid gap-2 col-6 mx-auto'
    const saveButton = document.createElement('button')
    saveButton.classList = 'btn btn-danger mt-3 mb-3'
    saveButton.type = 'submit'
    saveButton.textContent = 'Save'
    div.append(saveButton)

    lineHolder.append(label)
    lineHolder.append(input)
    form.append(lineHolder)
    form.append(div)

    display.append(error)
    display.appendChild(cancelIcon)
    const friendDiv = document.createElement('div')
    friendDiv.classList = 'friend-div'
    const p = document.createElement('p')
    p.textContent = 'My Friends:'
    friendDiv.appendChild(p)

    display.appendChild(friendDiv)
    display.appendChild(buttonHolder)
    display.appendChild(form)

    cancelIcon.addEventListener('click', () => displayBg.remove())
    addBtn.addEventListener('click', () => {
        if (form.style.display === 'none') {
            form.style.display = 'block'
        } else {
            form.style.display = 'none'
        }
        const allCrossboxes = document.querySelectorAll('.crossbox')
        allCrossboxes.forEach((each) => {
                each.style.display = 'none'
            })
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target))
        return axios
            .put(`/api/users/${user.id}`, data)
            .then((res) => {
                axios
                    .get('/api/session')
                    .then(({ data }) => {
                        renderFriendProfile(data.user)
                        renderLeftPane(data.user)
                    })
                    .catch((err) => console.error(err))
            })
            .catch((err) => {
                error.innerHTML = err.response.data.message
                console.error(err)
            })
    })

    deleteBtn.addEventListener('click', () => {
        form.style.display = 'none'
        const allCrossboxes = document.querySelectorAll('.crossbox')
        allCrossboxes.forEach((each) => {
            if (each.style.display === 'none') {
                each.style.display = 'inline-block'
            } else {
                each.style.display = 'none'
            }

            each.addEventListener('click', () => {
                return axios
                    .put(`/api/users/${user.id}/${each.dataset.email}`)
                    .then((res) => {
                        axios
                            .get('/api/session')
                            .then(({ data }) => {
                                renderLeftPane(data.user)
                                renderFriendProfile(data.user)
                            })
                            .catch((err) => console.error(err))
                    })
                    .catch((err) => {
                        error.innerHTML = err.response.data.message
                        console.error(err)
                    })
            })
        })
    })
}

export default renderFriendProfile
