import renderLeftPane from "./renderLeftPane.js";

const renderEditDeleteProjectForm = (project_id, project_name, user) => {   
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    } 
    const display = document.createElement("div");
    display.className = "display";
    document.body.prepend(display);

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    const editProjectForm = document.createElement("div");
    editProjectForm.innerHTML = `
    <form id="edit-delete-project-form">
        <p>
            <label for="name">Project Name</label></br>
            <input type="text" name="name" value='${project_name}'></input>
        </p>
        <button class="btn-style" type="submit">Save</button>
        <button class="btn-style" id="deleteProject">Delete Project</button>
    </form>
    `;
    display.appendChild(cancelIcon)
    display.appendChild(editProjectForm)

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("edit-delete-project-form").addEventListener("submit", function(event){
        handleEditProjectFormSubmit(event, user, project_id)}) 
    document.getElementById('deleteProject').addEventListener("click", function(){
        handleDeleteProject(project_id, user)
    })  
}

const handleEditProjectFormSubmit = async (event, user, project_id) => {
    document.querySelector('.display').remove()
    event.preventDefault()
    const formData = new FormData(event.target);
    console.log('hello')
    const body = {
        name: formData.get('name'),
    };

    return axios.put(`/api/projects/${project_id}`, body)
    .then(res => {
        renderLeftPane(user);
    })
    .catch(err => {
        console.error(err)
    })
}

const handleDeleteProject = (project_id, user) => {
    document.querySelector('.display').remove()
    return axios.delete(`/api/projects/${project_id}`)
    .then(res => {
        document.querySelector('#main-content').innerHTML = ''
        renderLeftPane(user);
    })
    .catch(err => {
        console.error(err)
    })
}

export { renderEditDeleteProjectForm, handleEditProjectFormSubmit, handleDeleteProject }