import renderTasks from "./renderTasks.js"
const getTasksDueTodayOrUpcoming = async (user_id, showDueToday, user) => {
    console.log('hello abcd')
    const oldDisplay = document.querySelector('.display')
    if (oldDisplay) {
        oldDisplay.remove()
    }
    // showDueToday determines which tasks array to retrieve when rendering today or upcoming tasks
    const todayDate = new Date()
    const timeZoneOffset = todayDate.getTimezoneOffset() * 60000
    const todayFormatted = new Date(todayDate - timeZoneOffset).toISOString().slice(0, 10)
    // console.log(todayFormatted)
    try {
        const response = await axios.get('/api/projects/' + user_id)
        // retrieves all projects from the user
        const projects = response.data
        // console.log(projects)
        const tasksDueTodayArr = []
        const upcomingTasksArr = []
        for (const project of projects) {
            // for each project returns all tasks by project id
            const response = await axios.get(`/api/tasks/project/${project.id}`)
            const tasks = response.data
            for (const task of tasks) {
                const taskDueDate = new Date(task.due_date)
                const taskDueDateFormatted = new Date(taskDueDate - timeZoneOffset).toISOString().slice(0, 10)

                if (taskDueDateFormatted === todayFormatted) {
                    tasksDueTodayArr.push({
                        ...task,
                        projectName: project.name
                    })
                } else if (taskDueDateFormatted > todayFormatted) {
                    upcomingTasksArr.push({
                        ...task,
                        projectName: project.name
                    })
                }
            }
        }

        const tasksArray = showDueToday ? tasksDueTodayArr : upcomingTasksArr
        const title = showDueToday ? '' : ''
        renderTasks(tasksArray, title, undefined, user)
    } catch (err) {
        console.error(err)
    }
}

export default getTasksDueTodayOrUpcoming
