const renderHeader = (user) => {
    const header = document.getElementById('header-nav')

    header.innerHTML = `
    <nav class="navbar navbar-expand-lg" style="background-color: #bad7e9">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img id="logo-img" src="./images/tskr-high-resolution-logo-color-on-transparent-background.png" alt="logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse nav-underline justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item px-5">
                        <a class="nav-link active" aria-current="page" href="#" id="sortListByToday">Today</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" id="sortListByUpcoming">Upcoming</a>
                    </li>
                    <li class="nav-item px-5">
                        <a class="nav-link" href="#" id="renderNotesPage">Notes</a>
                    </li>
                </ul>
            </div>
            <div class="nav-item dropdown px-5">
                <a class="nav-link dropdown-toggle name-display" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${user.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item user-detail" href="#">View Details</a></li>
                    <li><a class="dropdown-item logout-btn" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
      </nav>    
    `
    const logoutBtn = document.querySelector('.logout-btn')
    logoutBtn.addEventListener('click', () => {
        axios
            .delete('/api/session')
            .then((res) => (window.location = '/entry.html'))
    })

    const userDetail = document.querySelector('.user-detail')
    userDetail.addEventListener('click', () => {
        const display = document.createElement("div");
        display.className = "display";
        document.body.prepend(display);

        const cancelIcon = document.createElement('i')
        cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

        const name = document.createElement("p");
        name.className = 'display-text';
        name.textContent = `NAME:  ${user.name}`;

        const email = document.createElement("p");
        email.textContent = `EMAIL:  ${user.email}`;
        email.className = 'display-text';

        const changeBtn = document.createElement('button')
        changeBtn.classList = 'btn btn-outline-light m-3'
        changeBtn.textContent = 'Change Password?'


        const form = document.createElement('form')
        form.id = 'change-pass-form'
        form.style.display="none"
        const lineHolder1 = document.createElement('div')
        lineHolder1.classList="mb-3"
        const lineHolder2 = document.createElement('div')
        lineHolder2.classList="mb-3"
        const labelOld = document.createElement('label')
        labelOld.textContent = 'Old Password: '
        labelOld.classList = "form-label"
        const inputOld = document.createElement('input')
        inputOld.classList = "form-control"
        inputOld.required = true
        inputOld.type = 'password'
        inputOld.name = 'password1'
        const labelNew = document.createElement('label')
        labelNew.textContent = 'New Password: '
        labelNew.classList = "form-label"
        const inputNew = document.createElement('input')
        inputNew.classList = "form-control"
        inputNew.required = true
        inputNew.type = 'password'
        inputNew.name = 'password2'
   
        const editButton = document.createElement('button')
        editButton.classList = 'btn btn-info m-3'
        editButton.type='submit'
        editButton.textContent = 'Edit'


        lineHolder1.append(labelOld)
        lineHolder1.append(inputOld)
        lineHolder2.append(labelNew)
        lineHolder2.append(inputNew)
        form.append(lineHolder1)
        form.append(lineHolder2)
        form.append(editButton)

  

  
        display.appendChild(cancelIcon)
        display.appendChild(name);
        display.appendChild(email)
        display.appendChild(changeBtn)
        display.appendChild(form)
        
  
        // editButton.addEventListener('click', ()=>renderEditUser(challenge.name, challenge.description, challenge.address, challenge.id))
        // deleteButton.addEventListener('click', ()=> deleteChallenge(challenge.id))
  
        cancelIcon.addEventListener("click", () => display.remove())
        changeBtn.addEventListener('click', ()=>{
            if(form.style.display==="none"){
                form.style.display="block"
            }else{
                form.style.display="none"
            }
        })

        form.addEventListener('submit', (event)=>{
            event.preventDefault()

            const data = Object.fromEntries(new FormData(event.target))
            
        })
    })
}

export default renderHeader

/* <p class="name-display"><button class="logout-btn">Logout</button></p>
<ul>
    <li role="button" class="nav-item" id="sortListByToday">Today</li>
    <li role="button" class="nav-item" id="sortListByUpcoming">Upcoming</li>
    <li role="button" class="nav-item" id="renderNotesPage">Notes</li>
</ul> */
