import { renderTasks } from "./renderTasks.js"
import { renderNewProjectForm } from "./renderNewProjectForm.js"
import { renderEditDeleteProjectForm } from "./renderEditDeleteProjectForm.js"

const renderLeftPane = async (user) => {
    const personalProjectsListUl = document.getElementById('personal-projects-list-ul')
    const workProjectsListUl = document.getElementById('work-projects-list-ul')
    const studyProjectsListUl = document.getElementById('study-projects-list-ul')
    
    personalProjectsListUl.innerHTML=''
    workProjectsListUl.innerHTML=''
    studyProjectsListUl.innerHTML=''

    axios.get(`/api/projects/${user.id}`)
        .then((response) => {
        const { data } = response
            for (let project of data){
                const newDiv = document.createElement('div')
                newDiv.classList += 'project-list-item'
                const projectName = document.createElement('p')
                projectName.classList += 'project-name'
                projectName.innerText = project.name
                newDiv.appendChild(projectName)
                const editButton = document.createElement('i')
                editButton.classList = 'fa-solid fa-ellipsis project-edit-button'

                if (project.task_type === 'group'){
                    newDiv.classList.add('group-project')
                    const groupIcon = document.createElement('i')
                    newDiv.appendChild(groupIcon)
                    groupIcon.className = 'fa-solid fa-user-group'
                } else {
                    const individualIcon = document.createElement('i')
                    newDiv.appendChild(individualIcon)
                    individualIcon.className = 'fa-solid fa-user'
                }
                
                if (project.category === 'work'){
                    workProjectsListUl.appendChild(newDiv)
                } else if (project.category === 'personal'){
                    personalProjectsListUl.appendChild(newDiv)
                } else {
                    studyProjectsListUl.appendChild(newDiv)
                }
                newDiv.appendChild(editButton)
                projectName.addEventListener('click', async function() {
                    const tasks = await axios.get('/api/tasks/project/' + project.id) 
                    renderTasks(tasks.data, project.name, project.id, user)
                })
                editButton.addEventListener('click', async function(){
                    const tasks = await axios.get('/api/tasks/project/' + project.id) 
                    renderEditDeleteProjectForm(project, user, tasks.data)
                })
            }
        })
        
        const addPersonalProjectBtn = document.getElementById('add-personal-project-btn')
        const addWorkProjectBtn = document.getElementById('add-work-project-btn')
        const addStudyProjectBtn = document.getElementById('add-study-project-btn')

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

export default renderLeftPane

