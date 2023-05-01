import renderLeftPane from './renderLeftPane.js'
import renderComments from './renderComments.js'
import { renderTasks } from './renderTasks.js'
import renderEditTask from './renderEditTaskForm.js'

const renderTaskDetails = async (task, tasksArray, projectTitle, projectID, user) => {
  const contentDiv = document.getElementById('main-content')
  contentDiv.innerHTML = ''
  contentDiv.className = ''
  // this div contains details for a task
  const taskDetailsDiv = document.createElement('div')
  taskDetailsDiv.classList.add('task-details')
  // formats the dates
  const dueDate = new Date(task.due_date).toLocaleDateString()
  const creationDate = new Date(task.creation_date).toLocaleDateString()

  let taskStatus
  if (task.status === 1) {
    taskStatus = 'To Do'
  } else if (task.status === 2) {
    taskStatus = 'In Progress'
  } else {
    taskStatus = 'Complete'
  }

  let important = ''
  if (task.priority_level === 2) {
    important = '<p>High importance</p>'
  }

  taskDetailsDiv.innerHTML = `
    <div>
        <h2>${task.name}</h2>
        <h5><strong>Description:</strong></h4>
        <p>${task.description}</p>
    </div>
    <div>
        <p>Due on ${dueDate} at ${task.due_time.slice(0, 5)}</p>
        ${important}
        <p>Status: ${taskStatus}</p>
        <p>Created on ${creationDate}</p>
    </div>
    <div class="close-task-details">
    <button class="btn btn-outline-danger mt-3 mb-3 edit-task-details-btn">Edit</button>
    <button class="btn btn-danger mt-3 mb-3 mx-2 close-task-details-btn">Close</button>
        
    </div>
    `
  contentDiv.appendChild(taskDetailsDiv)

  const closeButton = taskDetailsDiv.querySelector('.close-task-details-btn')

  closeButton.addEventListener('click', () => {
    renderLeftPane(user)
    async function renderNew() {
      document.querySelector('#main-content').innerHTML = ''
      const response = await axios.get(`/api/tasks/project/${projectID}`)
      renderTasks(response.data, projectTitle, projectID, user)
    }
    renderNew()
    // renderTasks(tasksArray, projectTitle, projectID)
  })

  const editButton = taskDetailsDiv.querySelector('.edit-task-details-btn')
  editButton.addEventListener('click', () => {
    renderEditTask(task, tasksArray, projectID, projectTitle, user)
  })

  //////////////////////////////////////
  // Render comments inside taskDetailsDiv
  try {
    const response = await axios.get(`/api/comments/${task.id}`)
    const commentsData = response.data
    renderComments(commentsData, taskDetailsDiv, task, user, projectTitle, projectID, tasksArray)
  } catch (err) {
    console.error(err)
  }
  //////////////////////////////////////
}

export default renderTaskDetails
