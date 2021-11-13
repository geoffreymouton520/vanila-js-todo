import { CreateTaskComponent } from './components/create-task.component';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { TaskSwimLanesComponent } from './components/task-swim-lanes.component';
import { IComponent } from './components/component';

export class AppComponent implements IComponent {
  private readonly _createTaskComponent: CreateTaskComponent;
  private readonly _taskSwimLanesComponent: TaskSwimLanesComponent;

  public constructor(
    taskService: TaskService,
    notificationService: NotificationService
  ) {
    this._createTaskComponent = new CreateTaskComponent(
      taskService,
      notificationService
    );
    this._taskSwimLanesComponent = new TaskSwimLanesComponent(
      taskService,
      notificationService
    );
  }

  public render(): string {
    return `
        <h1>Task Management</h1>
        ${this._createTaskComponent.render()}
        ${this._taskSwimLanesComponent.render()}
      `;
  }

  public bind(): void {
    this._createTaskComponent.bind();
    this._taskSwimLanesComponent.bind();
  }
}
