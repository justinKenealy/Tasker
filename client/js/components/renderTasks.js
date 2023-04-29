import renderNewTaskForm from './renderNewTask.js'
import renderDeleteTask from './renderDeleteTask.js'
import renderComments from './renderComments.js'
import renderEditTask from './renderEditTaskForm.js'
const renderTasks = (tasksArray, projectTitle, projectID, user) => {
    console.log(tasksArray)
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    // this div contains list of tasks
    const tasksArrayDiv = document.createElement('div')
    tasksArrayDiv.classList.add('tasks')
    // creates heading for the project
    const title = document.createElement('p')
    title.classList.add('project-title')
    title.innerText = projectTitle
    tasksArrayDiv.appendChild(title)
    contentDiv.appendChild(tasksArrayDiv)

    if (projectID) {
        const addTasks = document.createElement('i')
        addTasks.className = 'add-tasks-button'
        addTasks.classList.add('fa-solid', 'fa-plus-square')
        title.appendChild(addTasks)
        addTasks.addEventListener('click', () => {
            renderNewTaskForm(tasksArray, projectTitle, projectID, user)
        })
    }

    if (projectID) {
        contentDiv.classList = 'kanban'
        const toDoDiv = document.createElement('div')
        const inProgressDiv = document.createElement('div')
        const completedTaskDiv = document.createElement('div')
        toDoDiv.id = 'to-do-div'
        toDoDiv.classList='drag-zone'
        inProgressDiv.id = 'in-progress-div'
        inProgressDiv.classList='drag-zone'
        completedTaskDiv.id = 'completed-task-div'
        completedTaskDiv.classList='drag-zone'


        const toDoDivUl = document.createElement('ul')
        const inProgressDivUl = document.createElement('ul')
        const completedTaskDivUl = document.createElement('ul')
        toDoDivUl.id = 'to-do-div-ul'
        inProgressDivUl.id = 'in-progress-div-ul'
        completedTaskDivUl.id = 'completed-tasks-div-ul'

        const toDoDivH1 = document.createElement('h1')
        const inProgressDivH1 = document.createElement('h1')
        const completedTaskDivH1 = document.createElement('h1')
        toDoDivH1.innerText = 'To Do'
        inProgressDivH1.innerText = 'In Progress'
        completedTaskDivH1.innerText = 'Complete'

        contentDiv.appendChild(toDoDiv)
        contentDiv.appendChild(inProgressDiv)
        contentDiv.appendChild(completedTaskDiv)

        toDoDiv.appendChild(toDoDivH1)
        inProgressDiv.appendChild(inProgressDivH1)
        completedTaskDiv.appendChild(completedTaskDivH1)
        toDoDiv.appendChild(toDoDivUl)
        inProgressDiv.appendChild(inProgressDivUl)
        completedTaskDiv.appendChild(completedTaskDivUl)
    }

    const taskList = document.createElement('ul')
    for (let task of tasksArray) {
        const taskListItem = document.createElement('li')
        taskListItem.classList='task-list-item'
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task-div')
        taskDiv.draggable = true

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
                renderDeleteTask(task.id, projectTitle, projectID)
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
                statusSpan.innerHTML =
                    '<i class="fa-solid fa-square-check"></i>'
                    statusSpan.dataset.status = 3
                // statusSpan.style.color = 'green'
                break
            case 2:
                // in progress
                statusSpan.innerHTML = '⏳'
                statusSpan.dataset.status = 2
                // statusSpan.style.color = 'yellow'
                break
            default:
                // to-do
                statusSpan.innerText = '🚩'
                statusSpan.dataset.status = 1
                // statusSpan.style.color = '#eb455f'
                break
        }


        //all the individual task item lists
        let draggedItem = null
        taskListItem.addEventListener('dragstart', ()=>{
            draggedItem = taskListItem
            setTimeout(()=>{
                taskListItem.style.display = 'none'            
            }, 0)
            
        })

        taskListItem.addEventListener('dragend', ()=>{
            setTimeout(()=>{
                draggedItem.style.display = 'block' 
                draggedItem = null           
            }, 0)
        })


        //All the to-do, in-progress and completed task panels
        const allSection = document.querySelectorAll('.drag-zone')
        allSection.forEach((each)=>{
            each.addEventListener('dragover', (e)=>{
                e.preventDefault()
            })
            each.addEventListener('dragenter', (e)=>{
                e.preventDefault()
                e.target.style.backgroundColor = '#FCFFE7'
            })
            each.addEventListener('dragleave', (e)=>{
                e.preventDefault()
                e.target.style.backgroundColor = 'white'
            })
            each.addEventListener('drop', (e)=>{
                console.log(e.target)
                e.target.querySelector('ul').appendChild(draggedItem)
                e.target.style.backgroundColor = 'white'
                if (e.target.id==='to-do-div'){
                    statusSpan.dataset.status =1
                }else if(e.target.id==='in-progress-div'){
                    statusSpan.dataset.status =2
                }else{
                    statusSpan.dataset.status =3
                }
                
                
                // console.log(e.target)

            })
        })


        taskHeading.addEventListener('click', () => {
            renderTaskDetails(task, tasksArray, projectTitle, projectID, user)
        })
        taskListItem.appendChild(taskDiv)

        if (projectID) {
            if (task.status === 0) {
                const toDoDivUl = document.getElementById('to-do-div-ul')
                toDoDivUl.appendChild(taskListItem)
            } else if (task.status === 1) {
                const inProgressDivUl =
                    document.getElementById('in-progress-div-ul')
                inProgressDivUl.appendChild(taskListItem)
            } else {
                const completedTaskDivUl = document.getElementById(
                    'completed-tasks-div-ul'
                )
                completedTaskDivUl.appendChild(taskListItem)
            }
        } else {
            taskList.appendChild(taskListItem)
        }
    }
    if (!projectID) {
        tasksArrayDiv.appendChild(taskList)
    }
}

const renderTaskDetails = async (
    task,
    tasksArray,
    projectTitle,
    projectID,
    user
) => {
    const contentDiv = document.getElementById('main-content')
    contentDiv.innerHTML = ''
    contentDiv.className = ''
    // this div contains details for a task
    const taskDetailsDiv = document.createElement('div')
    taskDetailsDiv.classList.add('task-details')
    // formats the dates
    const dueDate = new Date(task.due_date).toLocaleDateString()
    const creationDate = new Date(task.creation_date).toLocaleDateString()
    
   // const dueTime = new Date(
    //    `1970-01-01T${task.due_time}:00Z`
  //  ).toLocaleTimeString('en-US', {
   //     hour: 'numeric',
   //     minute: 'numeric',
    //    hour12: true,
   // })

    // const dueTime = (`1970-01-01T${task.due_time}:00Z`).toLocaleTimeString('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: true
    // })

    let taskStatus 
    if (task.status === 1){
        taskStatus = 'To Do'
    } else if (task.status === 2){
        taskStatus = 'In Progress'
    } else {
        taskStatus = 'Complete'
    }

    let important = ''
    if (task.priority_level === 2){
        important = '<p>High importance</p>'
    }

    taskDetailsDiv.innerHTML = `
    <div>
        <h2>${task.name}</h2>
        <h5><strong>Description:</strong></h4>
        <p>${task.description}</p>
    </div>
    <div>
        <p>Due on ${dueDate} at ${task.due_time.slice(0,5)}</p>
        ${important}
        <p>Status: ${taskStatus}</p>
        <p>Created on ${creationDate}</p>
    </div>
    <div class="close-task-details">
        <button class="close-task-details-btn">Close</button>
        <button class="edit-task-details-btn">Edit</button>
    </div>
    `
    contentDiv.appendChild(taskDetailsDiv)

    const closeButton = taskDetailsDiv.querySelector('.close-task-details-btn')
    closeButton.addEventListener('click', () => {
        renderTasks(tasksArray, projectTitle, projectID)
    })

    const editButton = taskDetailsDiv.querySelector('.edit-task-details-btn')
    editButton.addEventListener('click', () => {
        renderEditTask(task, tasksArray)
    })

    //////////////////////////////////////
    // Render comments inside taskDetailsDiv
    try {
        const response = await axios.get(`/api/comments/${task.id}`)
        const commentsData = response.data.map((comment) => ({
            ...comment,
            user_name: user.user_name || 'Unknown',
        }))
        renderComments(
            commentsData,
            taskDetailsDiv,
            task,
            user,
            projectTitle,
            projectID,
            tasksArray
        )
    } catch (err) {
        console.error(err)
    }
    //////////////////////////////////////
}

export default renderTasks
export { renderTasks, renderTaskDetails }
