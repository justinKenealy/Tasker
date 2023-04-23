const renderLeftPane = async (user_id) => {
    const personalProjectsListUl = document.getElementById('personalProjectsListUl')
    const workProjectsListUl = document.getElementById('workProjectsListUl')
    const studyProjectsListUl = document.getElementById('studyProjectsListUl')

    // get user session
    //get projects by user

    axios.get(`/api/projects/${user_id}`)
        .then((response) => {
        const { data } = response
        for (let project of data){
            const newLi = document.createElement('li')
            newLi.innerText = project.name
            if (project.task_type === 'group'){
                newLi.classList.add('groupProject')
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
                console.log(tasks.data)
            })
        }
        })


}

export default renderLeftPane
