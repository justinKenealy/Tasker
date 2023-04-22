const error = document.getElementById('errors')

const handleUserFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const action = form.dataset.action

    const data = Object.fromEntries(new FormData(form))

    const path = action==='login'?'session':'users'
    return axios.post(`/api/${path}`, data)
    .then(res=> {
        window.location ='/'
    })
    .catch(err=> {
        error.innerHTML = err.response.data.message
        console.error(err)})
}

document.body.addEventListener('submit', handleUserFormSubmit)


