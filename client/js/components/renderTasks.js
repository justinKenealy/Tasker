const renderTasks = (tasksArray) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    const newUl = document.createElement('ul')
    for (let task of tasksArray){
        const newLi = document.createElement('li')
        newLi.innerHTML = task.description
        newUl.appendChild(newLi)
    }
    contentDiv.appendChild(newUl)
}

export default renderTasks