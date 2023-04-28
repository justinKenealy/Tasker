import renderLeftPane from "./renderLeftPane.js";

const renderNewProjectForm = (projectCategory, user) => {    
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    }
    const display = document.createElement("div");
    display.className = "display";
    document.body.prepend(display);

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const newProjectForm = document.createElement("div");
    newProjectForm.innerHTML = `
    <form id="create-project-form">
        <p>
            <label for="name">Project Name</label></br>
            <input type="text" name="name"></input>
        </p>
        <p>
            <label for="projectType">Type</label><br>
            <input type="radio" id="projectTypeIndividual" name="projectType" value="single">
            <label for="individual">Individual</label><br>
            <input type="radio" id="projectTypeGroup" name="projectType" value="group">
            <label for="group">Group</label><br>
        </p>
        <p id="collaboratorsFormField" style="display:none;">
            <label for="collaborators">Collaborators</label>
        </p>
        <input type="hidden" name="userId" value=${user.id}></input>
        <input type="hidden" name="category" value=${projectCategory}></input>
        <button class="btn btn-danger mt-3 mb-3" type="submit">Create</button>
    </form>
    `;
    display.appendChild(cancelIcon)
    display.appendChild(newProjectForm)
    const collaboratorsFormField = document.getElementById('collaboratorsFormField')

    for (let friend of user.friends_array){
        const newFriendCheckBox = document.createElement('div')
        newFriendCheckBox.innerHTML = `
        <input type="checkbox" id=${friend} name="collaborators" value=${friend}>
        <label for=${friend}>${friend}</label>
        `
        collaboratorsFormField.appendChild(newFriendCheckBox)
    }

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("create-project-form").addEventListener("submit", function(event){
        handleFormSubmit(event, user)})
    document.getElementById("projectTypeGroup").addEventListener('click', function(){
        collaboratorsFormField.style.display = 'block'
    })
    document.getElementById("projectTypeIndividual").addEventListener('click', function(){
        collaboratorsFormField.style.display = 'none'
    })
}

const handleFormSubmit = async (event, user) => {
    event.preventDefault()
    document.querySelector('.display').remove()
    const formData = new FormData(event.target);
    const friends = formData.getAll('collaborators')
    const result = await axios.post('/api/users/multiple', friends)
    const collabIDs = result.data.IDs

    const body = {
        user_id: Number(formData.get('userId')),
        collab: collabIDs,
        category: formData.get('category'),
        name: formData.get('name'),
        task_type: formData.get('projectType')
    };

    return axios.post('/api/projects', body)
    .then(res => {
        renderLeftPane(user);
    })
    .catch(err => {
        console.error(err)
    })
}

export { renderNewProjectForm, handleFormSubmit }