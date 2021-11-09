import './assets/app.scss';
import {CreateTaskComponent} from "./components/create-task.component";
import {TaskService} from "./services/task.service";
import {TodoTasksComponent} from "./components/todo-tasks.component";

const taskService = new TaskService();

const createTaskComponent = new CreateTaskComponent(taskService);
createTaskComponent.init();

const todoTaskComponent = new TodoTasksComponent(taskService);
todoTaskComponent.init();
