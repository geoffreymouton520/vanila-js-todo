import { TaskModel } from '../models/task.model';
import { TaskStatusEnum } from '../models/task-status.enum';
import { TaskService } from '../services/task.service';
import { IComponent } from './component';

export class CreateTaskComponent implements IComponent {
  private form: HTMLFormElement;
  private title: HTMLInputElement;
  private description: HTMLTextAreaElement;
  private startDate: HTMLInputElement;
  private endDate: HTMLInputElement;
  private submitButton: HTMLButtonElement;

  public constructor(private readonly _taskService: TaskService) {}

  public init(): void {
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

  private submit(ev: MouseEvent): void {
    ev.preventDefault();
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
}
