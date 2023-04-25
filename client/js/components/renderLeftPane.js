import renderTasks from "./renderTasks.js"

const renderLeftPane = async (user) => {
    const personalProjectsListUl = document.getElementById('personalProjectsListUl')
    const workProjectsListUl = document.getElementById('workProjectsListUl')
    const studyProjectsListUl = document.getElementById('studyProjectsListUl')
    
    personalProjectsListUl.innerHTML=''
    workProjectsListUl.innerHTML=''
    studyProjectsListUl.innerHTML=''

    axios.get(`/api/projects/${user.id}`)
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
                    renderTasks(tasks.data, project.name)
                })
            }
        })
        
        const addPersonalProjectBtn = document.getElementById('addPersonalProjectBtn')
        const addWorkProjectBtn = document.getElementById('addWorkProjectBtn')
        const addStudyProjectBtn = document.getElementById('addStudyProjectBtn')

        addPersonalProjectBtn.addEventListener('click', function(){
            renderNewProjectForm('personal', user)
        })
        
        addWorkProjectBtn.addEventListener('click', function(){
            renderNewProjectForm('work', user)
        })
        
        addStudyProjectBtn.addEventListener('click', function(){
            renderNewProjectForm('study', user)
        })
}

const renderNewProjectForm = (projectCategory, user) => {    
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
        <p id="collaboratorsFormField">
            <label for="collaborators">Collaborators</label>
            <select multiple name="collaborators">
                <option>Person A</option>
                <option>Person B</option>
                <option>Person C</option>
            </select>
        </p>
        <input type="hidden" name="userId" value=${user.id}></input>
        <input type="hidden" name="category" value=${projectCategory}></input>
        <button class="btn-style" type="submit">Create</button>
    </form>
    `;

    display.appendChild(cancelIcon)
    display.appendChild(newProjectForm)

    cancelIcon.addEventListener("click", () => display.remove())
    document.getElementById("create-project-form").addEventListener("submit", function(event){
        handleFormSubmit(event, user)})
    document.getElementById("projectTypeGroup").addEventListener('click', function(){
        document.getElementById('collaboratorsFormField').style.display = 'block'
    })
    document.getElementById("projectTypeIndividual").addEventListener('click', function(){
        document.getElementById('collaboratorsFormField').style.display = 'none'
    })
}

const handleFormSubmit = (event, user) => {
    event.preventDefault()
    document.querySelector('.display').remove()
    const formData = new FormData(event.target);
    
    const body = {
        user_id: Number(formData.get('userId')),
        collab: formData.get('collaborators'),
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

export default renderLeftPane

