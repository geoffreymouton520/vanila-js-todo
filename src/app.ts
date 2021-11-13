import './assets/app.scss';
import { CreateTaskComponent } from './components/create-task.component';
import { TaskService } from './services/task.service';
import { TodoTasksComponent } from './components/todo-tasks.component';
import { NotificationService } from './services/notification.service';

// Services
const taskService = new TaskService();
const notificationService = new NotificationService();

// Components
const createTaskComponent = new CreateTaskComponent(
  taskService,
  notificationService
);
const todoTaskComponent = new TodoTasksComponent(
  taskService,
  notificationService
);

createTaskComponent.init();
todoTaskComponent.init();
