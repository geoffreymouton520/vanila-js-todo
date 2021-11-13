import './assets/app.scss';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { TemplateService } from './services/template.service';
import { AppComponent } from './app.component';

const taskService = new TaskService();
const notificationService = new NotificationService();
const templateService = new TemplateService();

const appComponent = new AppComponent(
  taskService,
  notificationService,
  templateService
);

const root = document.getElementById('root');
if (root) {
  root.innerHTML += appComponent.render();
  appComponent.bind();
}
