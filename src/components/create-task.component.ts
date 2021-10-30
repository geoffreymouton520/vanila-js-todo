export class CreateTaskComponent {
    private title: HTMLInputElement;
    private submitButton: HTMLButtonElement;

    constructor() {
    }

    public init(): void {
        this.title = document.getElementById('create-task-title') as HTMLInputElement;
        this.submitButton = document.getElementById('create-task-submit') as HTMLButtonElement;
        this.submitButton.addEventListener('click', (ev: MouseEvent) => {
            this.submit(ev);
        });
    }

    private submit(ev: MouseEvent): void {
        ev.preventDefault();

        this.title = document.getElementById('create-task-title') as HTMLInputElement;
        console.log('The form was submitted:', this.title.value);
        console.log('Title element:', this.title);
    }
}
