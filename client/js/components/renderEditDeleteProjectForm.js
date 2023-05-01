import renderLeftPane from './renderLeftPane.js'
import { renderTasks } from './renderTasks.js'

const renderEditDeleteProjectForm = async (project, user, tasksArray) => {
  const { collab } = project
  const { data } = await axios.post('/api/users/multipleid/', collab)
  const { emails } = data

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

  let personalChecked = ''
  let workChecked = ''
  let studyChecked = ''
  if (project.category === 'personal') {
    personalChecked = 'checked'
  }
  if (project.category === 'work') {
    workChecked = 'checked'
  }
  if (project.category === 'study') {
    studyChecked = 'checked'
  }

  const editProjectForm = document.createElement('div')
  editProjectForm.innerHTML = `
    <form id="edit-delete-project-form" class="row g-3">
        <div class="col-12">
            <label for="name" class="form-label">Project Name</label></br>
            <input type="text" name="name" value='${project.name}' class='form-control'></input>
        </div>
        <div class="col-12" >
            <label for="project-category" class="form-label">Category</label><br>
            <div class="form-check"> 
                <input type="radio" class="form-check-input" id="project-category-personal" name="project-category" value="personal" ${personalChecked}>
                <label for="personal" class="form-check-label">Personal</label><br>
            </div>
            <div class="form-check">
                <input type="radio" class="form-check-input" id="project-category-work" name="project-category" value="work" ${workChecked}>
                <label for="work" class="form-check-label">Work</label><br>
            </div>  
            <div class="form-check">
                <input type="radio" class="form-check-input" id="project-category-study" name="project-category" value="study" ${studyChecked}>
                <label for="study" class="form-check-label">Study</label><br>
            </div>  
        </div>
    
        <div id="collaborators-in-edit-project-form" style="display: none">
            <label for="collab">Project Collaborators</label><br>
        </div>
        <button class="btn btn-outline-light mt-3 mb-3" type="submit">Save</button>
        <button class="btn btn-danger mt-3 mb-3" id="deleteProject">Delete Project</button>
    </form>
    `
  display.appendChild(cancelIcon)
  display.appendChild(editProjectForm)

  if (project.task_type === 'group') {
    document.getElementById('collaborators-in-edit-project-form').style.display = 'block'
    for (let email of emails) {
      const newDiv = document.createElement('div')
      newDiv.innerText = email
      document.getElementById('collaborators-in-edit-project-form').appendChild(newDiv)
    }
  }

  cancelIcon.addEventListener('click', () => displayBg.remove())
  document.getElementById('edit-delete-project-form').addEventListener('submit', function (event) {
    handleEditProjectFormSubmit(event, user, project.id, tasksArray)
  })
  document.getElementById('deleteProject').addEventListener('click', function () {
    handleDeleteProject(project.id, user)
  })
}

const handleEditProjectFormSubmit = async (event, user, project_id, tasksArray) => {
  document.querySelector('.display-bg').remove()
  event.preventDefault()
  const formData = new FormData(event.target)
  const body = {
    name: formData.get('name'),
    category: formData.get('project-category'),
  }

  return axios
    .put(`/api/projects/${project_id}`, body)
    .then((res) => {
      renderLeftPane(user)
      renderTasks(tasksArray, body.name, project_id, user)
    })
    .catch((err) => {
      console.error(err)
    })
}

const handleDeleteProject = (project_id, user) => {
  document.querySelector('.display-bg').remove()
  return axios
    .delete(`/api/projects/${project_id}`)
    .then((res) => {
      document.querySelector('#main-content').innerHTML = ''
      renderLeftPane(user)
    })
    .catch((err) => {
      console.error(err)
    })
}

export { renderEditDeleteProjectForm, handleEditProjectFormSubmit, handleDeleteProject }
