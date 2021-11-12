import { TaskStatusEnum } from './task-status.enum';

export interface ITaskJson {
  _title: string;
  _description: string;
  _status: TaskStatusEnum;
  _startDate: Date;
  _endDate: Date;
  _id: string;
}
