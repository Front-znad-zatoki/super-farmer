import { Render } from './utils/Render';

export abstract class EmptyView {
  protected view: HTMLElement;

  constructor(isPale = false) {
    this.view = Render.elementFactory('div', {
      className: `view${isPale ? ' view--pale' : ''}`,
    });
  }

  hide(): void {
    this.view.classList.add('hidden');
  }

  show(): void {
    this.view.classList.remove('hidden');
  }
}
