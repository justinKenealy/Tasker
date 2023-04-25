const renderTasks = (tasksArray, projectName) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''

    // this div contains list of tasks
    const tasksArrayDiv = document.createElement('div')
    tasksArrayDiv.classList.add('tasks')
    
    // creates heading for the project
    const projectTitle = document.createElement('h5')
    projectTitle.classList.add("project-title")
    projectTitle.innerText = projectName
    tasksArrayDiv.appendChild(projectTitle)

    // creates an unordered list to hold the tasks
    const taskList = document.createElement('ul')

    for (let task of tasksArray) {

        const taskListItem = document.createElement('li')

        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task-div')

        const taskHeading = document.createElement('h6')
        taskHeading.innerText = task.name
        taskDiv.appendChild(taskHeading)
        
        const taskDueDate = document.createElement('p')
        taskDueDate.innerText = new Date(task.due_date).toLocaleDateString()
        taskDiv.appendChild(taskDueDate)
        
        //  displays project name (gets project_name from renderTasksDueToday())
        if (task.project_name){
            const projectName = document.createElement('p')
            projectName.classList.add('task-project-name')
            projectName.innerText = task.project_name
            taskDiv.appendChild(projectName)
        }
        // listens for clicks on a task to render the task details
        taskDiv.addEventListener('click', () => {
            renderTaskDetails(task, tasksArray, projectName)
        })
        taskListItem.appendChild(taskDiv)
        taskList.appendChild(taskListItem)
    }
    tasksArrayDiv.appendChild(taskList)
    contentDiv.appendChild(tasksArrayDiv)
}

const renderTaskDetails = (task, tasksArray, projectName) => {
    console.log(task)
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains details for a task
    const taskDetailsDiv = document.createElement('div')
    taskDetailsDiv.classList.add('task-details')

    // formats the due and creation date
    const dueDate = new Date (task.due_date).toLocaleDateString()
    const creationDate = new Date( task.creation_date).toLocaleDateString()
    
    let project_name = ''
    if (task.project_name){
        project_name = `<p>Project name: ${task.project_name}</p>`
    }

    taskDetailsDiv.innerHTML = `
    <h2>${task.name}</h2>
    <h4>Description</h4>
    <p>${task.description}</p>
    <p>Due date: ${dueDate} Due time: ${task.due_time}</p>
    <p>Priority level: ${task.priority_level}</p>
    <p>Status: ${task.status}</p>
    <p>Creation date: ${creationDate}</p>
    ${project_name}
    <button class="close-task-details">close</button>
    `
    contentDiv.appendChild(taskDetailsDiv)

    const closeButton = taskDetailsDiv.querySelector('.close-task-details')
    closeButton.addEventListener('click', () => {
        renderTasks(tasksArray, projectName)
    })
}

const renderTasksDueToday = () => {
    const today = new Date()
    // console.log(today)
    const todayFormatted = today.toISOString().slice(0, 10) 
    // console.log(todayFormatted)
    axios.get('api/tasks/due/' + todayFormatted)
        .then((response) => {
            // console.log(response)
            renderTasks(response.data, 'Tasks Due Today')
        })
        .catch((err) => {
            console.error(err)
        })

}

export default renderTasks
export {renderTasksDueToday}
