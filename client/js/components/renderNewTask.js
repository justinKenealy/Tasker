import {renderTasks} from "./renderTasks.js"

const renderNewTaskForm = (tasksArray, projectTitle, projectID, user) => {
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    }
    console.log(projectID)
    const display = document.createElement("div")
    display.classList.add('display')
    document.body.prepend(display)

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const todayDate = new Date()
    const timeZoneOffset = todayDate.getTimezoneOffset() * 60000
    const todayFormatted = new Date(todayDate - timeZoneOffset).toISOString().slice(0, 10)

    const newTaskForm = document.createElement("div")
    newTaskForm.innerHTML = `
    <form id="create-task-form">
        <p>
            <input type="hidden" name="project-id" value="${projectID}"></input>
            <input type="hidden" name="creation-date" value="${todayFormatted}"></input> 
        </p>
        <p>
            <label for="name">Task Name</label></br>
            <input type="text" name="name"></input>
        </p>
        <p>
            <label for="description">Description</label></br>
            <textarea name="description"></textarea>
        </p>
        <p>
            <label for="due-date">Due Date</label></br>
            <input type="date" name="due-date"></input>
        </p>
        <p>
            <label for="due-time">Due Time</label></br>
            <input type="time" name="due-time"></input>
        </p>
        <p>
            <label for="priority-level">Priority Level</label></br>
            <select name="priority-level">
                <option value="1">Low</option>
                <option value="2">High</option>
            </select>
        </p>
        <p>
            <label for="status">Status</label></br>
            <select name="status">
                <option value="1">To do</option>
                <option value="2">In progress</option>
                <option value="3">Completed</option>
            </select>
        </p>
        <button type="submit">Create Task</button>
    </form>
    `
    display.appendChild(cancelIcon)
    display.appendChild(newTaskForm)

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("create-task-form").addEventListener("submit", (event) => {
        handleSubmitForm(event, tasksArray, projectTitle, projectID, user)
    })
}

const handleSubmitForm = (event, tasksArray, projectTitle, projectID, user) => {
    event.preventDefault()
    document.querySelector('.display').remove()
    const formData = new FormData(event.target)

    const data = {
        project_id: formData.get('project-id'),
        name: formData.get('name'),
        description: formData.get('description'),
        creation_date: formData.get('creation-date'),
        due_date: formData.get('due-date'),
        due_time: formData.get('due-time'),
        priority_level: formData.get('priority-level'),
        status: Number(formData.get('status'))
    }

    return axios.post('/api/tasks', data)
        .then(res => {
            const createdTask = JSON.parse(res.config.data)
            tasksArray.push(createdTask)
            console.log(tasksArray)
            renderTasks(tasksArray, projectTitle, projectID, user)
        })
        .catch(err => {
            console.log(err)
        })
}

export default renderNewTaskForm