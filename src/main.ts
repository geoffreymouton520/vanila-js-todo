import './assets/app.scss';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { AppComponent } from './app.component';

const taskService = new TaskService();
const notificationService = new NotificationService();

const appComponent = new AppComponent(taskService, notificationService);

const root = document.getElementById('root');
if (root) {
  root.innerHTML += appComponent.render();
  appComponent.bind();
}
