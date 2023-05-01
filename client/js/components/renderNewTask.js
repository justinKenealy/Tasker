import {renderTasks} from "./renderTasks.js"

const renderNewTaskForm = (tasksArray, projectTitle, projectID, user) => {
    const oldDisplay = document.querySelector('.display-bg')
    if (oldDisplay) {
        oldDisplay.remove()
    }
    const displayBg = document.createElement('div')
    displayBg.className = 'display-bg'
    const display = document.createElement('div')
    display.className = 'display'
    displayBg.append(display)
    document.body.prepend(displayBg)

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const todayDate = new Date()
    const timeZoneOffset = todayDate.getTimezoneOffset() * 60000
    const todayFormatted = new Date(todayDate - timeZoneOffset).toISOString().slice(0, 10)

    const newTaskForm = document.createElement("div")
    newTaskForm.innerHTML = `
    <form id="create-task-form" class="row g-3">
        <div class="col-12">
            <input type="hidden" name="project-id" value="${projectID}"></input>
            <input type="hidden" name="creation-date" value="${todayFormatted}"></input> 
        </div>
        <div class="col-12">
            <label for="name" class="form-label">Task Name</label></br>
            <input type="text" name="name" class='form-control' required></input>
        </div>
        <div class="col-12">
            <label for="description" class="form-label">Description</label></br>
            <textarea name="description" class='form-control' required></textarea>
        </div>
        <div class="col-md-6">
            <label for="due-date" class="form-label">Due Date</label></br>
            <input type="date" name="due-date" class='form-control' required></input>
        </div>
        <div class="col-md-6">
            <label for="due-time" class="form-label">Due Time</label></br>
            <input type="time" name="due-time" class='form-control' required></input>
        </div>
        <div class="col-md-6">
            <label for="priority-level">Priority Level</label></br>
            <select class="form-select" name="priority-level">
                <option value="1">Low</option>
                <option value="2">High</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="status">Status</label></br>
            <select class="form-select" name="status">
                <option value="1">To do</option>
                <option value="2">In progress</option>
                <option value="3">Completed</option>
            </select>
        </div>
        <div class='d-grid gap-2 col-6 mx-auto'>
        <button type="submit" class="btn btn-danger">Create Task</button>
        </div
    </form>
    `
    display.appendChild(cancelIcon)
    display.appendChild(newTaskForm)

    cancelIcon.addEventListener("click", () => displayBg.remove())
    document.getElementById("create-task-form").addEventListener("submit", (event) => {
        handleSubmitForm(event, tasksArray, projectTitle, projectID, user)
    })
}

const handleSubmitForm = (event, tasksArray, projectTitle, projectID, user) => {
    event.preventDefault()
    document.querySelector('.display-bg').remove()
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