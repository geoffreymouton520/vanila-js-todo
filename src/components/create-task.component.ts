import { TaskModel } from '../models/task.model';
import { TaskStatusEnum } from '../models/task-status.enum';
import { TaskService } from '../services/task.service';
import { IComponent } from './component';
import { NotificationService } from '../services/notification.service';

export class CreateTaskComponent implements IComponent {
  private form?: HTMLFormElement;
  private title?: HTMLInputElement;
  private description?: HTMLTextAreaElement;
  private startDate?: HTMLInputElement;
  private endDate?: HTMLInputElement;
  private submitButton?: HTMLButtonElement;

  public constructor(
    private readonly _taskService: TaskService,
    private readonly _notificationService: NotificationService
  ) {}

  public bind(): void {
    this.form = document.getElementById('create-task-form') as HTMLFormElement;

    this.title = document.getElementById(
      'create-task-title'
    ) as HTMLInputElement;
    this.description = document.getElementById(
      'create-task-description'
    ) as HTMLTextAreaElement;
    this.startDate = document.getElementById(
      'create-task-start-date'
    ) as HTMLInputElement;
    this.endDate = document.getElementById(
      'create-task-end-date'
    ) as HTMLInputElement;

    this.submitButton = document.getElementById(
      'create-task-submit'
    ) as HTMLButtonElement;

    this.submitButton.addEventListener('click', (ev: MouseEvent) => {
      this.submit(ev);
    });
  }

  public render(): string {
    return `<div id='create-task' class='card'>
    <h2>Create New Task</h2>
    <form id='create-task-form'>
        <div class='form-group'>
            <label for='create-task-title'>Title</label>
            <input type='text' name='title' id='create-task-title'>
        </div>
        <div class='form-group'>
            <label for='create-task-description'>Description</label>
            <textarea rows='3' name='description' id='create-task-description'></textarea>
        </div>
        <div class='form-group'>
            <label for='create-task-start-date'>Start Date</label>
            <input type='date' name='start-date' id='create-task-start-date'>
        </div>
        <div class='form-group'>
            <label for='create-task-end-date'>End Date</label>
            <input type='date' name='end-date' id='create-task-end-date'>
        </div>
        <div class='btn-group'>
            <button type='reset' class='btn'>Clear</button>
            <button type='submit' class='btn' id='create-task-submit'>Submit</button>
        </div>
    </form>
</div>`;
  }

  private submit(ev: MouseEvent): void {
    ev.preventDefault();
    if (
      !this.form ||
      !this.title ||
      !this.description ||
      !this.startDate ||
      !this.endDate ||
      !this.isValid()
    ) {
      this._notificationService.error('The required field are missing values.');
      return;
    }
    const task = new TaskModel(
      this.title.value,
      this.description.value,
      TaskStatusEnum.Todo,
      new Date(this.startDate.value),
      new Date(this.endDate.value)
    );
    this._taskService.create(task);
    this.form.reset();
  }

  private isValid(): boolean {
    return (
      !!this.title?.value &&
      !!this.description?.value &&
      !!this.startDate?.value &&
      !!this.endDate?.value
    );
  }
}
