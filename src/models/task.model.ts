import { TaskStatusEnum } from './task-status.enum';
import { v4 as uuid } from 'uuid';

export class TaskModel {
  public get endDate(): Date {
    return this._endDate;
  }

  public set endDate(value: Date) {
    this._endDate = value;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public set startDate(value: Date) {
    this._startDate = value;
  }

  public get status(): TaskStatusEnum {
    return this._status;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get id(): string {
    return this._id;
  }

  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _status: TaskStatusEnum;
  private _startDate: Date;
  private _endDate: Date;

  public constructor(
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

  public complete(): void {
    if (!this.canBeCompleted()) {
      throw new Error(
        'Invalid task status change. Only tasks with a status of in progress can be completed.'
      );
    }
    this._status = TaskStatusEnum.Completed;
  }

  public cancel(): void {
    if (!this.canBeCancelled()) {
      throw new Error(
        'Invalid task status change. Completed and cancelled tasks cannot be cancalled.'
      );
    }
    this._status = TaskStatusEnum.Cancelled;
  }

  public start() {
    if (!this.canBeStarted()) {
      throw new Error(
        'Invalid task status change. Only tasks with a status of todo can be started.'
      );
    }
    this._status = TaskStatusEnum.InProgress;
  }

  public canBeStarted(): boolean {
    return this._status === TaskStatusEnum.Todo;
  }

  public canBeCancelled(): boolean {
    return (
      this._status !== TaskStatusEnum.Cancelled &&
      this._status !== TaskStatusEnum.Completed
    );
  }

  public canBeCompleted(): boolean {
    return this._status === TaskStatusEnum.InProgress;
  }
}
