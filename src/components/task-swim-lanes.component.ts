import { IComponent } from './component';
import { TodoTasksComponent } from './todo-tasks.component';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { InProgressTasksComponent } from './in-progress-tasks.component';
import { CompletedTasksComponent } from './completed-tasks.component';
import { CancelledTasksComponent } from './cancelled-tasks.component';

export class TaskSwimLanesComponent implements IComponent {
  private readonly _todoTaskComponent: TodoTasksComponent;
  private readonly _inProgressTaskComponent: InProgressTasksComponent;
  private readonly _completedTaskComponent: CompletedTasksComponent;
  private readonly _cancelledTaskComponent: CancelledTasksComponent;

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
    this._completedTaskComponent = new CompletedTasksComponent(
      taskService,
      notificationService
    );
    this._cancelledTaskComponent = new CancelledTasksComponent(
      taskService,
      notificationService
    );
  }

  public bind() {
    this._todoTaskComponent.bind();
    this._inProgressTaskComponent.bind();
    this._completedTaskComponent.bind();
    this._cancelledTaskComponent.bind();
  }

  public render(): string {
    return `
      <div id="task-swim-lanes">
        <h2>Tasks</h2>
        <div class="row">
          ${this._todoTaskComponent.render()}
          ${this._inProgressTaskComponent.render()}    
          ${this._completedTaskComponent.render()}    
          ${this._cancelledTaskComponent.render()}    
        </div>
      </div>
    `;
  }
}
