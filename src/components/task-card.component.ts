import { IComponent } from './component';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

export class TaskCardComponent implements IComponent {
  private startButton: HTMLButtonElement | null | undefined;
  private cancelButton: HTMLButtonElement | null | undefined;
  private completeButton: HTMLButtonElement | null | undefined;

  public constructor(
    private readonly _task: TaskModel,
    private readonly _taskService: TaskService,
    private readonly _notificationService: NotificationService
  ) {}

  public bind(): void {
    this.startButton = document.querySelector<HTMLButtonElement>(
      `.todo-tasks-list-start[data-task-id='${this._task.id}']`
    );
    this.cancelButton = document.querySelector<HTMLButtonElement>(
      `.todo-tasks-list-cancel[data-task-id='${this._task.id}']`
    );
    this.completeButton = document.querySelector<HTMLButtonElement>(
      `.todo-tasks-list-complete[data-task-id='${this._task.id}']`
    );

    this.startButton?.addEventListener('click', this.startClicked);
    this.cancelButton?.addEventListener('click', this.cancelClicked);
    this.completeButton?.addEventListener('click', this.completeClicked);
  }

  public render(): string {
    return `
        <div class='card'>
            <h4>${this._task.title}</h4>
            <div class='description'>${this._task.description}</div>
            <div>${this._task.startDate.toDateString()} - ${this._task.endDate.toDateString()}</div>
            <div class='btn-group'>${this.renderCancelButton()}${this.renderStartButton()}${this.renderCompleteButton()}</div>
        </div>
    `;
  }

  private renderCompleteButton(): string {
    return this._task.canBeCompleted()
      ? `<button class='btn todo-tasks-list-complete'  data-task-id='${this._task.id}'>Complete</button>`
      : '';
  }

  private renderStartButton(): string {
    return this._task.canBeStarted()
      ? `<button class='btn todo-tasks-list-start'  data-task-id='${this._task.id}'>Start</button>`
      : '';
  }

  private renderCancelButton(): string {
    return this._task.canBeCancelled()
      ? `<button class='btn todo-tasks-list-cancel' data-task-id='${this._task.id}'>Cancel</button>`
      : '';
  }

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

  private readonly completeClicked = (ev: MouseEvent): void => {
    const id = (ev.target as HTMLButtonElement).getAttribute('data-task-id');
    if (!id) {
      this._notificationService.error('Could not find task id');
      return;
    }
    this.completeTask(id);
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

  private readonly completeTask = (id: string): void => {
    try {
      this._taskService.completeTask(id);
    } catch (e) {
      this._notificationService.error((e as Error).message);
    }
  };
}
