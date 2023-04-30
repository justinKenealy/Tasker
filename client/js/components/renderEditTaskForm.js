import renderLeftPane from "./renderLeftPane.js";
import renderTaskDetails from "./renderTaskDetails.js";
import { renderTasks } from "./renderTasks.js";

const renderEditTask = (task, tasksArray, projectID, projectTitle, user) => {
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
            <button type="submit" class='btn btn-danger mt-3 mb-3'>Save</button>
        </form>
    `
    display.appendChild(cancelIcon)
    display.appendChild(editTaskForm)

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("edit-task-form").addEventListener("submit", (event) => {
        handleSubmitForm(event, task, tasksArray, projectID, projectTitle, user )
    })
    
}

const handleSubmitForm = (event, task, tasksArray, projectID, projectTitle, user) => {
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
    .then(async (res) => {
        async function renderNew(){
            document.querySelector('#main-content').innerHTML = ''
            const response = await axios.get(`/api/tasks/project/${projectID}`)
            renderTasks(response.data, projectTitle, projectID, user)
            const currentTask = response.data.find((task)=> task.id == taskId)
            // debugger
            renderTaskDetails(currentTask, response.data, projectTitle, projectID, user)
            renderLeftPane(user)
        }
        await renderNew()
        // renderTasks(tasksArray, projectTitle, projectID)


    })
    .catch(err => {
        console.error(err)
    })

}
export default renderEditTask