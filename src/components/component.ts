export interface IComponent {
  bind?(): void;
  render(): string;
}
