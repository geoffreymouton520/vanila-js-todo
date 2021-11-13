import { TaskModel } from '../models/task.model';

export class TemplateService {
  public readonly generateTaskCardTemplate = (
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
