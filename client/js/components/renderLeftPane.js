import renderTasks from "./renderTasks.js"
import { renderNewProjectForm, handleFormSubmit } from "./renderNewProjectForms.js"

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
                    // newLi.innerHTML += ` - &#1011${project.collab.length + 1}`
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

export default renderLeftPane

