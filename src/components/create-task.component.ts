export class CreateTaskComponent {
    private title: HTMLInputElement;
    private submitButton: HTMLButtonElement;

    constructor() {
    }

    public init(): void {
        this.title = document.getElementById('create-task-title') as HTMLInputElement;
        this.submitButton = document.getElementById('create-task-submit') as HTMLButtonElement;
        this.submitButton.addEventListener('click', this.submit);
    }

    private submit(): void {
        console.log('The form was submitted:', this.title.value);
    }
}
