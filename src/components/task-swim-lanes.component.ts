import { IComponent } from './component';
import { TodoTasksComponent } from './todo-tasks.component';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { TemplateService } from '../services/template.service';

export class TaskSwimLanesComponent implements IComponent {
  private readonly _todoTaskComponent: TodoTasksComponent;

  public constructor(
    taskService: TaskService,
    notificationService: NotificationService,
    templateService: TemplateService
  ) {
    this._todoTaskComponent = new TodoTasksComponent(
      taskService,
      notificationService,
      templateService
    );
  }

  public bind() {
    this._todoTaskComponent.bind();
  }

  public render(): string {
    return `<div id="task-swim-lanes">
    <h2>Tasks</h2>
    <div class="row">
    ${this._todoTaskComponent.render()}
        <div id="in-progress-tasks" class="column">
            <h3>In Progress</h3>
            <div class="card"></div>
        </div>
        <div id="completed-tasks" class="column">
            <h3>Completed</h3>
            <div class="card"></div>
        </div>
        <div id="cancelled-tasks" class="column">
            <h3>Cancelled</h3>
            <div class="card"></div>
        </div>
    </div>
</div>`;
  }
}
