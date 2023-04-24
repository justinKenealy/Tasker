import renderTasks from "./renderTasks.js"

const renderLeftPane = async (user_id) => {
    const personalProjectsListUl = document.getElementById('personalProjectsListUl')
    const workProjectsListUl = document.getElementById('workProjectsListUl')
    const studyProjectsListUl = document.getElementById('studyProjectsListUl')

    axios.get(`/api/projects/${user_id}`)
        .then((response) => {
        const { data } = response
            for (let project of data){
                const newLi = document.createElement('li')
                newLi.innerHTML = project.name
                if (project.task_type === 'group'){
                    newLi.classList.add('groupProject')
                    newLi.innerHTML += ` - &#1011${project.collab.length + 1}`
                }
                if (project.category === 'work'){
                    workProjectsListUl.appendChild(newLi)
                } else if (project.category === 'personal'){
                    personalProjectsListUl.appendChild(newLi)
                } else {
                    studyProjectsListUl.appendChild(newLi)
                }
                newLi.addEventListener('click', async function() {
                    const tasks = await axios.get('/api/tasks/project/' + project.id) 
                    renderTasks(tasks.data)
                })
            }
        })
}

const addPersonalProjectBtn = document.getElementById('addPersonalProjectBtn')
const addWorkProjectBtn = document.getElementById('addWorkProjectBtn')
const addStudyProjectBtn = document.getElementById('addStudyProjectBtn')

const renderNewProjectForm = (typeofProject) => {
    console.log('create new ' + typeofProject + ' project')
    
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
            <input type="radio" id="projectTypeIndividual" name="projectType" value="individual">
            <label for="individual">Individual</label><br>
            <input type="radio" id="projectTypeGroup" name="projectType" value="group">
            <label for="group">Group</label><br>
        </p>
        <p>
            <label for="collaborators">Collaborators</label>
            <select name="collaboratos">
                <option>Person A</option>
                <option>Person B</option>
                <option>Person C</option>
            </select>
        </p>
        <input type="hidden" name="category" value="${typeofProject}"></input>
        <input type="hidden" name="userID" value="  USERID VARIABLE HERE  "></input>
    </form>
    `;

    const btnHolder = document.createElement('div')
    btnHolder.className = 'btn-holder'
    
    const createButton = document.createElement('button')
    createButton.textContent = 'Create'
    createButton.className = 'btn-style'

    btnHolder.appendChild(createButton)
    display.appendChild(cancelIcon)
    display.appendChild(newProjectForm)
    display.appendChild(btnHolder)

    cancelIcon.addEventListener("click", () => display.remove())
}

addPersonalProjectBtn.addEventListener('click', function(){
    renderNewProjectForm('Personal')
})

addWorkProjectBtn.addEventListener('click', function(){
    renderNewProjectForm('Work')
})

addStudyProjectBtn.addEventListener('click', function(){
    renderNewProjectForm('Study')
})

export default renderLeftPane
