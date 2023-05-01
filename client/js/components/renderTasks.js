import renderNewTaskForm from './renderNewTask.js'
import renderDeleteTask from './renderDeleteTask.js'
import renderLeftPane from './renderLeftPane.js'
import renderTaskDetails from './renderTaskDetails.js'

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

    contentDiv.classList = 'kanban'
    const kanbanContentHolder = document.createElement('div')
    kanbanContentHolder.classList = 'kanban-holder'
    const listWrapper1 = document.createElement('div')
    listWrapper1.classList = 'list-wrapper'
    const listWrapper2 = document.createElement('div')
    listWrapper2.classList = 'list-wrapper'
    const listWrapper3 = document.createElement('div')
    listWrapper3.classList = 'list-wrapper'
    const toDoDiv = document.createElement('div')
    const inProgressDiv = document.createElement('div')
    const completedTaskDiv = document.createElement('div')
    toDoDiv.id = 'to-do-div'
    toDoDiv.classList = 'drag-zone'
    inProgressDiv.id = 'in-progress-div'
    inProgressDiv.classList = 'drag-zone'
    completedTaskDiv.id = 'completed-task-div'
    completedTaskDiv.classList = 'drag-zone'

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

    listWrapper1.appendChild(toDoDiv)
    listWrapper2.appendChild(inProgressDiv)
    listWrapper3.appendChild(completedTaskDiv)
    kanbanContentHolder.appendChild(listWrapper1)
    kanbanContentHolder.appendChild(listWrapper2)
    kanbanContentHolder.appendChild(listWrapper3)

    contentDiv.appendChild(kanbanContentHolder)

    toDoDiv.appendChild(toDoDivH1)
    inProgressDiv.appendChild(inProgressDivH1)
    completedTaskDiv.appendChild(completedTaskDivH1)
    toDoDiv.appendChild(toDoDivUl)
    inProgressDiv.appendChild(inProgressDivUl)
    completedTaskDiv.appendChild(completedTaskDivUl)
  }

  let draggedItem = null
  let draggedId = null
  const allSection = document.querySelectorAll('.drag-zone')
  const taskList = document.createElement('ul')

  for (let task of tasksArray) {
    const taskListItem = document.createElement('li')
    taskListItem.classList = 'task-list-item'
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

      //arranges in kanban style
      if (task.status === 1) {
        const toDoDivUl = document.getElementById('to-do-div-ul')
        toDoDivUl.appendChild(taskListItem)
      } else if (task.status === 2) {
        const inProgressDivUl = document.getElementById('in-progress-div-ul')
        inProgressDivUl.appendChild(taskListItem)
      } else {
        const completedTaskDivUl = document.getElementById('completed-tasks-div-ul')
        completedTaskDivUl.appendChild(taskListItem)
      }

      //DRAG & DROP feature
      //all the individual task items
      taskListItem.addEventListener('dragstart', () => {
        draggedItem = taskListItem
        draggedId = task.id
        setTimeout(() => {
          taskListItem.style.display = 'none'
        }, 0)
      })

      taskListItem.addEventListener('dragend', () => {
        taskListItem.classList.remove('dragged-item')
        setTimeout(() => {
          draggedItem.style.display = 'block'
          draggedItem = null
          draggedId = null
        }, 0)
      })
    } else {
      taskList.appendChild(taskListItem)
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
        break
      case 2:
        // in progress
        statusSpan.innerHTML = '<i class="fa-solid fa-bars-progress"></i>'
        break
      default:
        // to-do
        statusSpan.innerHTML = '<i class="fa-solid fa-list-check"></i>'
        break
    }

    taskHeading.addEventListener('click', () => {
      renderTaskDetails(task, tasksArray, projectTitle, projectID, user)
    })
    taskListItem.appendChild(taskDiv)
  }

  //All the to-do, in-progress and completed task panels for drag & drop
  allSection.forEach((each) => {
    each.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    each.addEventListener('dragenter', (e) => {
      e.preventDefault()
      each.style.backgroundColor = '#FCFFE7'
    })
    each.addEventListener('dragleave', (e) => {
      e.preventDefault()
      each.style.backgroundColor = 'white'
    })
    each.addEventListener('drop', () => {
      each.querySelector('ul').append(draggedItem)
      each.style.backgroundColor = 'white'
      if (each.id === 'to-do-div') {
        draggedItem.querySelector('.task-status').innerHTML =
          '<i class="fa-solid fa-list-check"></i>'

        return axios
          .put(`/api/tasks/${draggedId}/1`)
          .then((res) => {
            renderLeftPane(user)
          })
          .catch((err) => console.error(err))
      } else if (each.id === 'in-progress-div') {
        draggedItem.querySelector('.task-status').innerHTML =
          '<i class="fa-solid fa-bars-progress"></i>'

        return axios.put(`/api/tasks/${draggedId}/2`).then((res) => {
          renderLeftPane(user)
        })
      } else {
        draggedItem.querySelector('.task-status').innerHTML =
          '<i class="fa-solid fa-square-check"></i>'

        return axios.put(`/api/tasks/${draggedId}/3`).then((res) => {
          renderLeftPane(user)
        })
      }
    })
  })
  ////

  if (!projectID) {
    if (tasksArray.length === 0) {
      document.getElementById('main-content').classList -= 'kanban-notes'
      const notask = document.createElement('p')
      notask.classList.add('no-task')
      notask.textContent = 'No more tasks to complete.'
      tasksArrayDiv.appendChild(notask)
    } else {
      tasksArrayDiv.appendChild(taskList)
      contentDiv.classList = ''
    }
  }
}

export { renderTasks, renderTaskDetails }
