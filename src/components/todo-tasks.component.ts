import { TaskService } from '../services/task.service';
import { IComponent } from './component';
import { TaskModel } from '../models/task.model';
import { TaskStatusEnum } from '../models/task-status.enum';

export class TodoTasksComponent implements IComponent {
  private list: HTMLDivElement;

  public constructor(private readonly _taskService: TaskService) {}

  public init = (): void => {
    this.list = document.getElementById('todo-tasks-list') as HTMLDivElement;
    this._taskService.addTasksChangedListener(this.loadTasks);
    this.loadTasks();
  };

  private readonly loadTasks = () => {
    const tasks = this._taskService
      .getAll()
      .filter((value: TaskModel) => value.status === TaskStatusEnum.Todo);
    const taskCards = tasks.map(TodoTasksComponent.generateTaskCardTemplate);

    this.list.innerHTML = taskCards.join('');

    const startButtons: Array<HTMLButtonElement> = Array.from(
      document.getElementsByClassName(
        'todo-tasks-list-start'
      ) as HTMLCollectionOf<HTMLButtonElement>
    );

    startButtons.map(this.initStartButtons);
  };

  private readonly initStartButtons = (button: HTMLButtonElement) => {
    button.addEventListener('click', this.startClicked);
  };

  private readonly startClicked = (ev: MouseEvent): void => {
    const id = (ev.target as HTMLButtonElement).getAttribute('data-task-id');
    this.startTask(id);
  };

  private readonly startTask = (id: string): void => {
    this._taskService.startTask(id);
  };

  private static readonly generateTaskCardTemplate = (
    value: TaskModel
  ): string => `<div class="card">
                    <div>
                        <h4>${value.title}</h4>
                        <div>${value.startDate} - ${value.endDate}</div>
                    </div>
                    <div class="description">${value.description}</div>
                    <div>
                        <button class="btn todo-tasks-list-cancel" data-task-id="${value.id}">Cancel</button>
                        <button class="btn todo-tasks-list-start"  data-task-id="${value.id}">Start</button>
                    </div>
                </div>`;
}
