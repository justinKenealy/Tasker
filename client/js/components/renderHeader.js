const renderHeader = (user) => {
    const header = document.getElementById('header-nav');

    header.innerHTML = `
    <img id="logo-img" src="./images/tskr-high-resolution-logo-color-on-transparent-background.png" alt="logo">
        <p>Hello, __!!USER!!__<button class="logout-btn">Logout</button></p>
        <ul>
            <li role="button" class="nav-item" id="sortListByToday">Today</li>
            <li role="button" class="nav-item" id="sortListByUpcoming">Upcoming</li>
            <li role="button" class="nav-item" id="renderNotesPage">Notes</li>
        </ul>
    `
}

export default renderHeader