import { ITaskJson } from '../models/task-json.model';
import { TaskModel } from '../models/task.model';

export class TaskService {
  private readonly tasks: Array<TaskModel> = [];
  private readonly eventsDiv: HTMLDivElement;
  private readonly _tasksChangedEventName = 'tasks-changed';
  private readonly tasksChangedEvent: Event;

  public constructor() {
    this.eventsDiv = document.createElement('div');
    this.eventsDiv.id = 'task-service';
    this.tasksChangedEvent = new Event(this._tasksChangedEventName);

    const taskJson = sessionStorage.getItem('tasks');
    if (!taskJson) {
      return;
    }
    const jsonArray: Array<ITaskJson> = JSON.parse(taskJson);

    this.tasks = jsonArray.map((value: ITaskJson) => {
      return new TaskModel(
        value._title,
        value._description,
        value._status,
        value._startDate,
        value._endDate,
        value._id
      );
    });
  }

  public create(task: TaskModel): void {
    this.tasks.push(task);
    this.sync();
  }

  public getAll(): Array<TaskModel> {
    return this.tasks;
  }

  public getOne(id: string): TaskModel | undefined {
    return this.tasks.find((value: TaskModel) => value.id === id);
  }

  public startTask(id: string): void {
    const task: TaskModel | undefined = this.getOne(id);
    if (!task) {
      throw new Error(`Could not find task with id ${id}.`);
    }
    task.start();
    this.sync();
  }

  public cancelTask(id: string): void {
    const task: TaskModel | undefined = this.getOne(id);
    if (!task) {
      throw new Error(`Could not find task with id ${id}.`);
    }
    task.cancel();
    this.sync();
  }

  public addTasksChangedListener(callback: () => void): void {
    this.eventsDiv.addEventListener(
      this._tasksChangedEventName,
      callback,
      false
    );
  }

  private sync(): void {
    sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.eventsDiv.dispatchEvent(this.tasksChangedEvent);
  }
}
