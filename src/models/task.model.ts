import { TaskStatusEnum } from './task-status.enum';
import { v4 as uuid } from 'uuid';

export class TaskModel {
  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get status(): TaskStatusEnum {
    return this._status;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get id(): string {
    return this._id;
  }

  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _status: TaskStatusEnum;
  private _startDate: Date;
  private _endDate: Date;

  constructor(
    title: string,
    description: string,
    status: TaskStatusEnum,
    startDate: Date,
    endDate: Date,
    id: string = uuid()
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._startDate = startDate;
    this._endDate = endDate;
  }

  public markAsInProgress(): void {
    this._status = TaskStatusEnum.InProgress;
  }

  public complete(): void {
    this._status = TaskStatusEnum.Completed;
  }

  public cancel(): void {
    this._status = TaskStatusEnum.Cancelled;
  }

  public start() {
    if (this._status !== TaskStatusEnum.Todo) {
      throw new Error(
        'Invalid task status change. Only tasks with a status of todo can be started.'
      );
    }
    this._status = TaskStatusEnum.InProgress;
  }
}
