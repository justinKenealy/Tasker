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
            if (project.category === 'work'){
                workProjectsListUl.appendChild(newLi)
            } else if (project.category === 'personal'){
                personalProjectsListUl.appendChild(newLi)
            } else {
                studyProjectsListUl.appendChild(newLi)
            }
        }
        console.log(data)

        })


}

export default renderLeftPane
