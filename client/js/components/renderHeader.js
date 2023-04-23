const renderHeader = (userName) => {
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
                    ${userName}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item userDetail" href="#">View Details</a></li>
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

    // const userDetail = document.querySelector('.change-pass')
    // userDetail.addEventListener('click', () => {
        
    // })
}

export default renderHeader

/* <p class="name-display"><button class="logout-btn">Logout</button></p>
<ul>
    <li role="button" class="nav-item" id="sortListByToday">Today</li>
    <li role="button" class="nav-item" id="sortListByUpcoming">Upcoming</li>
    <li role="button" class="nav-item" id="renderNotesPage">Notes</li>
</ul> */
