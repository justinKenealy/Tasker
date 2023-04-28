import renderTasks from "./renderTasks.js"
const renderDeleteTask = async (taskId, projectTitle, projectID) => {
    const confirmed = confirm("Are you sure you want to delete this task?")
    console.log(taskId)
    console.log(projectTitle)
    console.log(projectID)

    function deleteTask(){
    return axios.delete(`/api/tasks/${taskId}`)
        .then(async res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    async function renderNew(){
        document.querySelector('#main-content').innerHTML = ''
        const response = await axios.get(`/api/tasks/project/${projectID}`)
        renderTasks(response.data, projectTitle, projectID)
    }

    if (confirmed){
        deleteTask().then(renderNew())
    }
}

export default renderDeleteTask
