import renderTasks from "./renderTasks.js"
const renderDeleteTask = async (taskId, projectTitle, projectID) => {
    // const confirmed = confirm("Are you sure you want to delete this task?")
    console.log(taskId)
    console.log(projectID)

    return axios.delete(`/api/tasks/${taskId}`)
        .then(async res => {
            document.querySelector('#main-content').innerHTML = ''
            const response = await axios.get(`/api/tasks/project/${projectID}`)
            console.log(res)
            renderTasks(response.data, projectTitle, projectID)

        })
        .catch(err => {
            console.log(err)
        })
}

export default renderDeleteTask
