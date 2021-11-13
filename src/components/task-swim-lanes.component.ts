import { IComponent } from './component';
import { TodoTasksComponent } from './todo-tasks.component';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { InProgressTasksComponent } from './in-progress-tasks.component';

export class TaskSwimLanesComponent implements IComponent {
  private readonly _todoTaskComponent: TodoTasksComponent;
  private readonly _inProgressTaskComponent: InProgressTasksComponent;

  public constructor(
    taskService: TaskService,
    notificationService: NotificationService
  ) {
    this._todoTaskComponent = new TodoTasksComponent(
      taskService,
      notificationService
    );
    this._inProgressTaskComponent = new InProgressTasksComponent(
      taskService,
      notificationService
    );
  }

  public bind() {
    this._todoTaskComponent.bind();
    this._inProgressTaskComponent.bind();
  }

  public render(): string {
    return `<div id="task-swim-lanes">
    <h2>Tasks</h2>
    <div class="row">
      ${this._todoTaskComponent.render()}
      ${this._inProgressTaskComponent.render()}    
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
