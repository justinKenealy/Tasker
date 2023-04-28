import renderComments from './renderComments.js';

const renderTaskDetails = async (task, tasksArray, projectTitle, projectID, user) => {
    console.log(task)
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
    
    //////////////////////////////////////
    // Render comments inside taskDetailsDiv
    try {
        const response = await axios.get(`/api/comments/${task.id}`);
        const commentsData = response.data.map((comment) => ({
            ...comment,
            user_name: user.user_name || 'Unknown',
        }));
        renderComments(commentsData, taskDetailsDiv, task, tasksArray, projectTitle, projectID, user);
    } catch (err) {
        console.error(err);
    }
    //////////////////////////////////////


    const closeButton = taskDetailsDiv.querySelector('.close-task-details')
    closeButton.addEventListener('click', () => {
        renderTasks(task, tasksArray, projectTitle, projectID, user)
    })
}

export default renderTaskDetails