export class TaskModel {
    public title: string;
    public description: string;
    public status: number;
    public startDate: Date;
    public endDate: Date;

    constructor(title: string, description: string, status: number, startDate: Date, endDate: Date) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
