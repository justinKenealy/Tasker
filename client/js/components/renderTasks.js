const renderTasks = (tasksArray) => {
    console.log(tasksArray)
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains list of tasks
    const tasksDiv = document.createElement('div')
    tasksDiv.classList.add('tasks')

    const newUl = document.createElement('ul')
    for (let task of tasksArray) {
        const newLi = document.createElement('li')
        const taskNameDiv = document.createElement('div')
        taskNameDiv.innerText = task.name
        taskNameDiv.classList.add('task-name')
        // listens for clicks on a task to render the task details
        taskNameDiv.addEventListener('click', () => {
            renderTaskDetails(task, tasksArray)
        })
        newLi.appendChild(taskNameDiv)
        newUl.appendChild(newLi)
    }
    tasksDiv.appendChild(newUl)
    contentDiv.appendChild(tasksDiv)
}

const renderTaskDetails = (task, tasksArray) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains details for a task
    const taskDetailsDiv = document.createElement('div')
    taskDetailsDiv.classList.add('task-details')

    taskDetailsDiv.innerHTML = `
    <h2>${task.name}</h2>
    <h4>Description</h4>
    <p>${task.description}</p>
    <p>Due date: ${task.due_date} Due time: ${task.due_time}</p>
    <p>Priority level: ${task.priority_level}</p>
    <p>Status: ${task.status}</p>
    <p>Creation date: ${task.creation_date}</p>
    <button class="close-task-details">close</button>
    `
    contentDiv.appendChild(taskDetailsDiv)
    const closeButton = taskDetailsDiv.querySelector('.close-task-details')
    closeButton.addEventListener('click', () => {
        renderTasks(tasksArray)
    })
}


export default renderTasks