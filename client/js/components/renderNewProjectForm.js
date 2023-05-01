import renderLeftPane from './renderLeftPane.js'

const renderNewProjectForm = (projectCategory, user) => {
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

  const newProjectForm = document.createElement('div')
  newProjectForm.innerHTML = `
    <form id="create-project-form" class="row g-3">
        <div class="col-12">
            <label for="name" class="form-label">Project Name</label></br>
            <input type="text" name="name" class='form-control' required></input>
        </div>
        <div class="col-12" >
            <label for="projectType" class="form-label">Type</label><br>
            <div class="form-check"> 
                <input type="radio" class="form-check-input" id="projectTypeIndividual" name="projectType" value="single" checked="checked">
                <label for="individual" class="form-check-label">Individual</label><br>
            </div>
            <div class="form-check">
                <input type="radio" class="form-check-input" id="projectTypeGroup" name="projectType" value="group">
                <label for="group" class="form-check-label">Group</label><br>
            </div>    
        </div>
        <div class="col-12" id="collaboratorsFormField" style="display:none;" class="col-12">
            <label for="collaborators">Collaborators</label>
            <div id="listOfCollaborators">
            </div>
        </div>
        <input type="hidden" name="userId" value=${user.id}></input>
        <input type="hidden" name="category" value=${projectCategory}></input>
        <div class='d-grid gap-2 col-6 mx-auto'>
            <button class="btn btn-danger mt-3 mb-3" type="submit">Create</button>
        </div>
    </form>
    `
  display.appendChild(cancelIcon)
  display.appendChild(newProjectForm)
  const collaboratorsFormField = document.getElementById('collaboratorsFormField')
  const listOfCollaborators = document.getElementById('listOfCollaborators')
  collaboratorsFormField.appendChild(listOfCollaborators)
  for (let friend of user.friends_array) {
    const newFriendCheckBox = document.createElement('div')
    newFriendCheckBox.innerHTML = `
        <input type="checkbox" id=${friend} name="collaborators" value=${friend}>
        <label for=${friend}>${friend}</label>
        `
    listOfCollaborators.appendChild(newFriendCheckBox)
  }

  cancelIcon.addEventListener('click', () => displayBg.remove())
  document.getElementById('create-project-form').addEventListener('submit', function (event) {
    handleFormSubmit(event, user)
  })
  document.getElementById('projectTypeGroup').addEventListener('click', function () {
    collaboratorsFormField.style.display = 'block'
  })
  document.getElementById('projectTypeIndividual').addEventListener('click', function () {
    collaboratorsFormField.style.display = 'none'
  })
}

const handleFormSubmit = async (event, user) => {
  event.preventDefault()
  document.querySelector('.display-bg').remove()
  const formData = new FormData(event.target)
  const friends = formData.getAll('collaborators')
  const result = await axios.post('/api/users/multiple', friends)
  const collabIDs = result.data.IDs

  const body = {
    user_id: Number(formData.get('userId')),
    collab: collabIDs,
    category: formData.get('category'),
    name: formData.get('name'),
    task_type: formData.get('projectType'),
  }

  return axios
    .post('/api/projects', body)
    .then((res) => {
      renderLeftPane(user)
    })
    .catch((err) => {
      console.error(err)
    })
}

export { renderNewProjectForm, handleFormSubmit }
