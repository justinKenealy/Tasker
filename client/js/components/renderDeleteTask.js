import renderTasks from "./renderTasks.js"
const renderDeleteTask = (taskId, tasksArray, projectTitle, projectID) => {
    const confirmed = confirm("Are you sure you want to delete this task?")
    if (confirmed) {
        return axios.delete(`/api/tasks/${taskId}`)
        .then(res => {
            console.log('helo')
            renderTasks(tasksArray, projectTitle, projectID)
            })
            
            .catch((error) => {
                console.error(error)
                alert("Failed to delete task")
            })
    }
}

export default renderDeleteTask