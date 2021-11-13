import { TaskService } from '../services/task.service';
import { IComponent } from './component';
import { TaskModel } from '../models/task.model';
import { TaskStatusEnum } from '../models/task-status.enum';
import { NotificationService } from '../services/notification.service';
import { TemplateService } from '../services/template.service';

export class TodoTasksComponent implements IComponent {
  private list?: HTMLDivElement;

  public constructor(
    private readonly _taskService: TaskService,
    private readonly _notificationService: NotificationService,
    private readonly _templateService: TemplateService
  ) {}

  public init = (): void => {
    this.list = document.getElementById('todo-tasks-list') as HTMLDivElement;
    this._taskService.addTasksChangedListener(this.loadTasks);
    this.loadTasks();
  };

  private readonly loadTasks = () => {
    if (!this.list) {
      return;
    }
    const tasks = this._taskService
      .getAll()
      .filter((value: TaskModel) => value.status === TaskStatusEnum.Todo);
    const taskCards = tasks.map(this._templateService.generateTaskCardTemplate);

    this.list.innerHTML = taskCards.join('');

    const startButtons: Array<HTMLButtonElement> = Array.from(
      document.getElementsByClassName(
        'todo-tasks-list-start'
      ) as HTMLCollectionOf<HTMLButtonElement>
    );

    const cancelButtons: Array<HTMLButtonElement> = Array.from(
      document.getElementsByClassName(
        'todo-tasks-list-cancel'
      ) as HTMLCollectionOf<HTMLButtonElement>
    );

    startButtons.map(this.initStartButtons);
    cancelButtons.map(this.initCancelButtons);
  };

  private readonly initStartButtons = (button: HTMLButtonElement) => {
    button.addEventListener('click', this.startClicked);
  };

  private readonly initCancelButtons = (button: HTMLButtonElement) => {
    button.addEventListener('click', this.cancelClicked);
  };

  private readonly startClicked = (ev: MouseEvent): void => {
    const id = (ev.target as HTMLButtonElement).getAttribute('data-task-id');
    if (!id) {
      this._notificationService.error('Could not find task id');
      return;
    }
    this.startTask(id);
  };

  private readonly cancelClicked = (ev: MouseEvent): void => {
    const id = (ev.target as HTMLButtonElement).getAttribute('data-task-id');
    if (!id) {
      this._notificationService.error('Could not find task id');
      return;
    }
    this.cancelTask(id);
  };

  private readonly startTask = (id: string): void => {
    try {
      this._taskService.startTask(id);
    } catch (e) {
      this._notificationService.error((e as Error).message);
    }
  };

  private readonly cancelTask = (id: string): void => {
    try {
      this._taskService.cancelTask(id);
    } catch (e) {
      this._notificationService.error((e as Error).message);
    }
  };
}
