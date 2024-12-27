import dummytask from "./dummy_task.json"
import projecttask from "./project_task.json"

const task = [
    ...projecttask,
    ...dummytask
]
export default task