import { Render } from '../utils/Render';

export abstract class EmptyModal {
  modal: HTMLElement;
  modalContainer: HTMLElement;
  constructor() {
    this.modalContainer = Render.elementFactory('div', {
      className: 'modal__container',
    });
    this.modal = Render.elementFactory(
      'div',
      { className: 'modal' },
      this.modalContainer,
    );
  }
}
