import renderFriendProfile from "./renderFriendProfile.js"
import renderUserProfile from "./renderUserProfile.js"
import renderNotes from "./renderNotes.js"
import { renderTasksDueToday } from "./renderTasks.js"

const renderHeader = (user) => {
    const header = document.getElementById('header-nav')
    const display = document.querySelector('.display')
    if (display) {
        display.remove()
    }
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg" style="background-color: #bad7e9">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img id="logo-img" src="./images/tskr-high-resolution-logo-black-on-transparent-background.png" alt="logo"></a>
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
                    ${user.user_name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item user-detail" href="#">View Details</a></li>
                    <li><a class="dropdown-item friend" href="#">Friends</a></li>
                    <li><a class="dropdown-item logout-btn" href="#">Logout</a></li>
                </ul>
            </div>
        </div>
      </nav>    
    `
    const notes = document.getElementById('renderNotesPage')
    notes.addEventListener('click', () => {
        const user_id = user.id
        return renderNotes(user_id)
    })

    const todaysLink = document.getElementById('sortListByToday')
    todaysLink.addEventListener('click', () => {
        renderTasksDueToday()
    })

    const logoutBtn = document.querySelector('.logout-btn')
    logoutBtn.addEventListener('click', () => {
        axios
            .delete('/api/session')
            .then((res) => (window.location = '/entry.html'))
    })

    const userDetail = document.querySelector('.user-detail')
    userDetail.addEventListener('click', ()=>{
        renderUserProfile(user)
    })

    const friendDetail = document.querySelector('.friend')
    friendDetail.addEventListener('click', ()=>{
        renderFriendProfile(user)
    })

}

export default renderHeader