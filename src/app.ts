import './assets/app.scss';
import {CreateTaskComponent} from "./components/create-task.component";
import {TaskService} from "./services/task.service";

const taskService = new TaskService();
const createTaskComponent = new CreateTaskComponent(taskService);
createTaskComponent.init();
