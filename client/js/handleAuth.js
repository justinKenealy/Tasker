const error = document.getElementById('errors')
const loginForm = document.getElementById('login')
const signUpForm = document.getElementById('signup')
const signupBtn = document.querySelectorAll('.signup-btn')
const loginBtn = document.querySelector('.login-btn')


loginBtn.addEventListener('click', ()=>{
    if (loginForm.style.display === 'none'){
        loginForm.style.display ='block'
    }
    signUpForm.style.display = 'none'
})

signupBtn.forEach((button)=> {
    button.addEventListener('click', () => {
        signUpForm.style.display ='block'
        loginForm.style.display = 'none'
    })
})



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


