import renderLeftPane from "./renderLeftPane.js";
import renderTasks from "./renderTasks.js";

const renderEditDeleteProjectForm = async (project, user, tasksArray) => {  
    const { collab } = project 
    const {data} = await axios.post('/api/users/multipleid/', collab)
    const { emails } = data

    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    } 
    const display = document.createElement("div");
    display.className = "display";
    document.body.prepend(display);

    const cancelIcon = document.createElement('i')
    cancelIcon.className = 'fa-solid fa-xmark cancel-icon'

    let personalChecked = ''
    let workChecked = ''
    let studyChecked = ''
    if (project.category === 'personal'){
        personalChecked = 'checked'
    }
    if (project.category === 'work'){
        workChecked = 'checked'
    }
    if (project.category === 'study'){
        studyChecked = 'checked'
    }
    
    const editProjectForm = document.createElement("div");
    editProjectForm.innerHTML = `
    <form id="edit-delete-project-form">
        <p>
            <label for="name">Project Name</label></br>
            <input type="text" name="name" value='${project.name}'></input>
        </p>
        <p>
            <label for="project-category">Category</label><br>
            <input type="radio" id="project-category-personal" name="project-category" value="personal" ${personalChecked}>
            <label for="personal">Personal</label><br>
            <input type="radio" id="project-category-work" name="project-category" value="work" ${workChecked}>
            <label for="work">Work</label><br>
            <input type="radio" id="project-category-study" name="project-category" value="study" ${studyChecked}>
            <label for="study">Study</label><br>
        </p>
        <p id="collaborators-in-edit-project-form" style="display: none">
            <label for="collab">Project Collaborators</label><br>
        </p>
        <button class="btn btn-outline-light mt-3 mb-3" type="submit">Save</button>
        <button class="btn btn-danger mt-3 mb-3" id="deleteProject">Delete Project</button>
    </form>
    `;
    display.appendChild(cancelIcon)
    display.appendChild(editProjectForm)
    
    if (project.task_type === 'group'){
        document.getElementById('collaborators-in-edit-project-form').style.display = 'block'
        for (let email of emails){
            const newDiv = document.createElement('div')
            newDiv.innerText = email
            document.getElementById('collaborators-in-edit-project-form').appendChild(newDiv)
        }
    }


    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("edit-delete-project-form").addEventListener("submit", function(event){
        handleEditProjectFormSubmit(event, user, project.id, tasksArray)}) 
    document.getElementById('deleteProject').addEventListener("click", function(){
        handleDeleteProject(project.id, user)
    })  
}

const handleEditProjectFormSubmit = async (event, user, project_id, tasksArray) => {
    document.querySelector('.display').remove()
    event.preventDefault()
    const formData = new FormData(event.target);
    const body = {
        name: formData.get('name'),
        category: formData.get('project-category')
    };

    return axios.put(`/api/projects/${project_id}`, body)
    .then(res => {
        renderLeftPane(user);
        renderTasks(tasksArray, body.name, project_id)
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