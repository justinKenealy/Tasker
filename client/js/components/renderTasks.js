const renderTasks = (tasksArray, projectName) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains list of tasks
    const tasksArrayDiv = document.createElement('div')
    tasksArrayDiv.classList.add('tasks')
    
    const projectTitle = document.createElement('h5')
    projectTitle.classList.add("project-title")
    projectTitle.innerText = projectName
    tasksArrayDiv.appendChild(projectTitle)

    const newUl = document.createElement('ul')
    for (let task of tasksArray) {
        const newLi = document.createElement('li')
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task-div')
        
        const taskHeading = document.createElement('h6')
        taskHeading.innerText = task.name

        const taskDueDate = document.createElement('p')
        taskDueDate.innerText = new Date(task.due_date).toLocaleDateString()

        taskDiv.appendChild(taskHeading)
        taskDiv.appendChild(taskDueDate)
        // listens for clicks on a task to render the task details
        taskDiv.addEventListener('click', () => {
            renderTaskDetails(task, tasksArray, projectName)
        })
        newLi.appendChild(taskDiv)
        newUl.appendChild(newLi)
    }
    tasksArrayDiv.appendChild(newUl)
    contentDiv.appendChild(tasksArrayDiv)
}

const renderTaskDetails = (task, tasksArray, projectName) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains details for a task
    const taskDetailsDiv = document.createElement('div')
    taskDetailsDiv.classList.add('task-details')

    const dueDate = new Date (task.due_date).toLocaleDateString()
    const creationDate = new Date( task.creation_date).toLocaleDateString()
    
    taskDetailsDiv.innerHTML = `
    <h2>${task.name}</h2>
    <h4>Description</h4>
    <p>${task.description}</p>
    <p>Due date: ${dueDate} Due time: ${task.due_time}</p>
    <p>Priority level: ${task.priority_level}</p>
    <p>Status: ${task.status}</p>
    <p>Creation date: ${creationDate}</p>
    <button class="close-task-details">close</button>
    `
    contentDiv.appendChild(taskDetailsDiv)
    const closeButton = taskDetailsDiv.querySelector('.close-task-details')
    closeButton.addEventListener('click', () => {
        renderTasks(tasksArray, projectName)
    })
}


export default renderTasks