import {TaskModel} from "../models/task.model";

export class TaskService {
    private readonly tasks: Array<TaskModel> = [];

    constructor() {
        let taskJson = sessionStorage.getItem('tasks');
        if (!taskJson) {
            return;
        }
        this.tasks = JSON.parse(taskJson, (_key: string, value: any) => {
            return new TaskModel(value.title, value.description, value.status, value.startDate, value.endDate, value.id);
        });
    }

    public create(task: TaskModel): void {
        this.tasks.push(task);
        this.sync();
    }

    public getAll(): Array<TaskModel> {
        return this.tasks;
    }

    private sync(): void {
        sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
