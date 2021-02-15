import { Render } from './utils/Render';

export abstract class EmptyView {
  protected view: HTMLElement;

  constructor(isMilked = false) {
    this.view = Render.elementFactory('div', {
      className: `view${isMilked ? ' view--pale' : ''}`,
    });
  }

  hide(): void {
    this.view.classList.add('hidden');
  }

  show(): void {
    this.view.classList.remove('hidden');
  }
}
