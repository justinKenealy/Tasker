const renderUserProfile = (user)=>{
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    }
    const display = document.createElement('div')
    display.className = 'display'
    document.body.prepend(display)

    const error = document.createElement('section')
    error.id = 'errors'

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const username = document.createElement('p')
    username.className = 'display-text'
    username.textContent = `USER NAME:  ${user.user_name}`

    const fullname = document.createElement('p')
    fullname.className = 'display-text'
    fullname.textContent = `FULL NAME:  ${user.full_name}`

    const email = document.createElement('p')
    email.textContent = `EMAIL:  ${user.email}`
    email.className = 'display-text'

    const changeBtn = document.createElement('button')
    changeBtn.classList = 'btn btn-outline-light mt-3 mb-3'
    changeBtn.textContent = 'Change Password?'

    const form = document.createElement('form')
    form.id = 'change-pass-form'
    form.style.display = 'none'
    const lineHolder1 = document.createElement('div')
    lineHolder1.classList = 'mb-3'
    const lineHolder2 = document.createElement('div')
    lineHolder2.classList = 'mb-3'
    const labelOld = document.createElement('label')
    labelOld.textContent = 'Old Password: '
    labelOld.classList = 'form-label'
    const inputOld = document.createElement('input')
    inputOld.classList = 'form-control'
    inputOld.required = true
    inputOld.type = 'password'
    inputOld.name = 'passwordOld'
    const labelNew = document.createElement('label')
    labelNew.textContent = 'New Password: '
    labelNew.classList = 'form-label'
    const inputNew = document.createElement('input')
    inputNew.classList = 'form-control'
    inputNew.required = true
    inputNew.type = 'password'
    inputNew.name = 'passwordNew'

    const div = document.createElement('div')
    div.classList = "d-grid gap-2 col-6 mx-auto"
    const editButton = document.createElement('button')
    editButton.classList = 'btn btn-danger mt-3 mb-3'
    editButton.type = 'submit'
    editButton.textContent = 'Edit'
    div.append(editButton)

    lineHolder1.append(labelOld)
    lineHolder1.append(inputOld)
    lineHolder2.append(labelNew)
    lineHolder2.append(inputNew)
    form.append(lineHolder1)
    form.append(lineHolder2)
    form.append(div)

    display.append(error)
    display.appendChild(cancelIcon)
    display.appendChild(username)
    display.appendChild(fullname)
    display.appendChild(email)
    display.appendChild(changeBtn)
    display.appendChild(form)


    cancelIcon.addEventListener('click', () => display.remove())
    changeBtn.addEventListener('click', () => {
        if (form.style.display === 'none') {
            form.style.display = 'block'
        } else {
            form.style.display = 'none'
        }
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target))
        return axios
            .put(`/api/users/${user.id}`, data)
            .then((res) => (window.location = '/'))
            .catch((err) => {
                error.innerHTML = err.response.data.message
                console.error(err)
            })
    })
}

export default renderUserProfile