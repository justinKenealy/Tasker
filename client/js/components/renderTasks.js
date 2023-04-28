import renderNewTaskForm from "./renderNewTask.js"
import renderDeleteTask from "./renderDeleteTask.js"
const renderTasks = (tasksArray, projectTitle, projectID) => {
    console.log(tasksArray)
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains list of tasks
    const tasksArrayDiv = document.createElement('div')
    tasksArrayDiv.classList.add('tasks')
    // creates heading for the project
    const title = document.createElement('p')
    title.classList.add("project-title")
    title.innerText = projectTitle
    tasksArrayDiv.appendChild(title)

    if (projectID) {
        const addTasks = document.createElement('i')
        addTasks.className = 'add-tasks-button'
        addTasks.classList.add('fa-solid', 'fa-plus-square')
        title.appendChild(addTasks)
        addTasks.addEventListener('click', () => {
            renderNewTaskForm(tasksArray, projectTitle, projectID)
        })
    }

    const taskList = document.createElement('ul')
    for (let task of tasksArray) {
        const taskListItem = document.createElement('li')
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task-div')

        const taskHeading = document.createElement('h6')
        taskHeading.classList.add('task-name')
        taskHeading.innerText = task.name
        taskDiv.appendChild(taskHeading)

        // const priority_level = document.createElement('i')
        // priority_level.innerText = '⚠️'
        // priority_level.className = 'priority-level'
        // taskHeading.appendChild(priority_level)
    
        const taskDueDate = document.createElement('p')
        taskDueDate.innerText = new Date(task.due_date).toLocaleDateString()
        taskDiv.appendChild(taskDueDate)

        const statusSpan = document.createElement('span')
        statusSpan.classList.add('task-status')
        taskDiv.appendChild(statusSpan)

        if (projectID) {
            const deleteButton = document.createElement('i')
            deleteButton.className = 'delete-task-button'
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
            taskDiv.appendChild(deleteButton)
            deleteButton.addEventListener('click', () => {
                renderDeleteTask(task.id, tasksArray, projectTitle, projectID)
            })
        }

        if (task.projectName) {
            const projectName = document.createElement('h6')
            projectName.innerText = task.projectName
            taskDiv.appendChild(projectName)
        }

        switch (task.status) {
            case 3:
                // completed
                statusSpan.innerHTML = '<i class="fa-solid fa-square-check"></i>'
                // statusSpan.style.color = 'green'
                break
            case 2:
                // in progress
                statusSpan.innerHTML = '⏳'
                // statusSpan.style.color = 'yellow'
                break
            default:
                // to-do
                statusSpan.innerText = '🚩'
                // statusSpan.style.color = '#eb455f'
                break
        }

        taskHeading.addEventListener('click', () => {
            renderTaskDetails(task, tasksArray, projectTitle, projectID)
        })
        taskListItem.appendChild(taskDiv)
        taskList.appendChild(taskListItem)
    }
    tasksArrayDiv.appendChild(taskList)
    contentDiv.appendChild(tasksArrayDiv)
}

const renderTaskDetails = (task, tasksArray, projectTitle, projectID) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains details for a task
    const taskDetailsDiv = document.createElement('div')
    taskDetailsDiv.classList.add('task-details')
    // formats the dates
    const dueDate = new Date(task.due_date).toLocaleDateString()
    const creationDate = new Date(task.creation_date).toLocaleDateString()
    const dueTime = new Date(`1970-01-01T${task.due_time}:00Z`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    taskDetailsDiv.innerHTML = `
    <h2>${task.name}</h2>
    <h4><strong>Description:</strong></h4>
    <p>${task.description}</p>
    <p>Due on ${dueDate} at ${dueTime}</p>
    <p>Priority level: ${task.priority_level}</p>
    <p>Status: ${task.status}</p>
    <p>Created on ${creationDate}</p>
    <button class="close-task-details">close</button>
    `
    contentDiv.appendChild(taskDetailsDiv)
    const closeButton = taskDetailsDiv.querySelector('.close-task-details')
    closeButton.addEventListener('click', () => {
        renderTasks(tasksArray, projectTitle, projectID)
    })
}

export default renderTasks

