import { Render } from './utils/Render';

export abstract class EmptyView {
  protected view: HTMLElement;
  protected viewContainer: HTMLElement;

  constructor(isHidden = true) {
    this.viewContainer = Render.elementFactory('div', {
      className: 'view__container',
    });
    this.view = Render.elementFactory(
      'div',
      { className: `view${isHidden ? ' hidden' : ''}` },
      this.viewContainer,
    );
  }

  hide(): void {
    this.view.classList.add('hidden');
  }

  show(): void {
    this.view.classList.remove('hidden');
  }

  static addOpacityToBackground(): void {
    const sfApp = document.querySelector('#sf-app');
    if (sfApp && !sfApp.classList.contains('blurred')) {
      sfApp.classList.add('blurred');
    }
  }

  static removeOpacityFromBackground(): void {
    const sfApp = document.querySelector('#sf-app');
    if (sfApp && sfApp.classList.contains('blurred')) {
      sfApp.classList.remove('blurred');
    }
  }
}
