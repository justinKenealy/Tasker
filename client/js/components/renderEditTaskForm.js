import { renderTaskDetails } from "./renderTasks.js";

const renderEditTask = (task, tasksArray) => {
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    } 
    const display = document.createElement("div");
    display.className = "display";
    document.body.prepend(display);

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'
    

    // const mainContent = document.querySelector('#main-content')
    const { id, name, description, due_date, due_time, priority_level } = task

    const taskDueDate = new Date(due_date)
    const timeZoneOffset = taskDueDate.getTimezoneOffset() * 60000
    const taskDueDateFormatted = new Date(taskDueDate - timeZoneOffset).toISOString().slice(0, 10)

    const editTaskForm = document.createElement("div")
    editTaskForm.innerHTML = `
    <form id="edit-task-form">
            <p>
                <input type="hidden" name="task-id" value="${id}"></input>
            </p>
            <p>
                <label for="name">Task Name</label></br>
                <input type="text" name="name" value="${name}"></input>
            </p>
            <p>
                <label for="description">Description</label></br>
                <textarea name="description">${description}</textarea>
            </p>
            <p>
                <label for="due-date">Due Date</label></br>
                <input type="date" name="due-date" value="${taskDueDateFormatted}"></input>
            </p>
            <p>
                <label for="due-time">Due Time</label></br>
                <input type="time" name="due-time" value="${due_time.slice(0, 5)}"></input>
            </p>
            <p>
                <label for="priority-level">Priority Level</label></br>
                <select name="priority-level">
                    <option value="1" ${priority_level === 1 ? "selected" : ""}>Low</option>
                    <option value="2" ${priority_level === 2 ? "selected" : ""}>High</option>
                </select>
            </p>
            <button type="submit">Save</button>
        </form>
    `
    display.appendChild(cancelIcon)
    display.appendChild(editTaskForm)

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("edit-task-form").addEventListener("submit", (event) => {
        handleSubmitForm(event, task, tasksArray)
    })
    
}

const handleSubmitForm = (event, task, tasksArray) => {
    event.preventDefault()
    document.querySelector('.display').remove()
    const formData = new FormData(event.target)
    const taskId = formData.get('task-id')

    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        due_date: formData.get('due-date'),
        due_time: formData.get('due-time'),
        priority_level: formData.get('priority-level')
    }

    return axios.put(`/api/tasks/${taskId}`, data)
    .then(res => {
        renderTaskDetails(task, tasksArray)
    })
    .catch(err => {
        console.error(err)
    })

}
export default renderEditTask