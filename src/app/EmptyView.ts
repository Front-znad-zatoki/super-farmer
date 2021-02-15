import { Render } from './utils/Render';

export abstract class EmptyView {
  protected view: HTMLElement;

  constructor(isHidden = true) {
    this.view = Render.elementFactory('div', {
      className: `view${isHidden ? ' hidden' : ''}`,
    });
  }

  hide(): void {
    this.view.classList.add('hidden');
  }

  show(): void {
    this.view.classList.remove('hidden');
  }
}
