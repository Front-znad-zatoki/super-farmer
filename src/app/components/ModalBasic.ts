import { Render } from '../utils/Render';
import { Button } from './Button';

export class ModalBasic {
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
  renderBasicModal(
    heading: string,
    text: string,
    modalContent?: HTMLElement,
  ): ModalBasic {
    // CREATE MAIN ELEMENTS
    const modalHeader = Render.elementFactory(
      'h2',
      { className: 'modal__heading' },
      heading,
    );
    const modalText = Render.elementFactory(
      'p',
      {
        className: 'modal__text',
      },
      text,
    );
    Render.childrenInjector(
      this.modalContainer,
      modalHeader,
      modalText,
      modalContent ? modalContent : '',
    );
    return this;
  }

  addModalContent(content: string | HTMLElement): HTMLElement {
    Render.childrenInjector(this.modalContainer, content);
    return this.modal;
  }

  createAndAppendButtonsRow(
    leftButtonText: string,
    leftButtonAction: () => void,
    rightButtonText: string,
    rightButtonAction: () => void,
  ): void {
    const leftButton: HTMLElement = new Button().create(
      leftButtonText,
    );
    const rightButton: HTMLElement = new Button().create(
      rightButtonText,
    );
    leftButton.addEventListener('click', leftButtonAction);
    rightButton.addEventListener('click', rightButtonAction);
    const buttonsRow = Render.elementFactory(
      'div',
      {
        className: 'modal__buttons',
      },
      leftButton,
      rightButton,
    );
    return Render.childrenInjector(this.modalContainer, buttonsRow);
  }
}
