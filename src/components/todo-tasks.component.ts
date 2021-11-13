import { TaskService } from '../services/task.service';
import { IComponent } from './component';
import { TaskModel } from '../models/task.model';
import { TaskStatusEnum } from '../models/task-status.enum';
import { NotificationService } from '../services/notification.service';
import { TaskCardComponent } from './task-card.component';

export class TodoTasksComponent implements IComponent {
  private list?: HTMLDivElement;

  public constructor(
    private readonly _taskService: TaskService,
    private readonly _notificationService: NotificationService
  ) {}

  public bind = (): void => {
    this.list = document.getElementById('todo-tasks-list') as HTMLDivElement;
    this._taskService.addTasksChangedListener(this.loadTasks);
    this.loadTasks();
  };

  public render(): string {
    return ` <div id='todo-tasks' class='column'>
            <h3>Todo</h3>
            <div id='todo-tasks-list' class='card'>
            </div>
        </div>`;
  }

  private readonly loadTasks = () => {
    if (!this.list) {
      return;
    }
    const tasks = this._taskService
      .getAll()
      .filter((value: TaskModel) => value.status === TaskStatusEnum.Todo);

    const taskCardComponents = tasks.map(
      (task: TaskModel) =>
        new TaskCardComponent(
          task,
          this._taskService,
          this._notificationService
        )
    );

    this.list.innerHTML = taskCardComponents
      .map((card: TaskCardComponent) => {
        return card.render();
      })
      .join('');
    taskCardComponents.forEach((card: TaskCardComponent) => card.bind());
  };
}
