import { Render } from './utils/Render';

export abstract class EmptyView {
  protected view: HTMLElement;

  constructor() {
    this.view = Render.elementFactory('div', {
      className: 'view',
    });
  }

  hide(): void {
    this.view.classList.add('hidden');
  }

  show(): void {
    this.view.classList.remove('hidden');
  }
}
