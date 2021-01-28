import { Render } from '../utils/Render';
import { Button } from './Button';

export class ModalBasic {
  modal: HTMLElement;
  constructor() {
    this.modal = Render.elementFactory('div', { className: 'modal' });
  }
  renderBasicModal(
    heading: string,
    text: string,
    modalContent?: HTMLElement,
    buttonsRow?: HTMLElement,
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

    const modalContainer = Render.elementFactory(
      'div',
      {
        className: 'modal__container',
      },
      modalHeader,
      modalText,
      modalContent ? modalContent : '',
      buttonsRow ? buttonsRow : '',
    );
    console.log(this.modal);
    Render.childrenInjector(this.modal, modalContainer);
    return this;
  }

  renderBottomButtons(
    leftButtonText: string,
    leftButtonAction: () => void,
    rightButtonText: string,
    rightButtonAction: () => void,
  ): HTMLElement {
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
    return buttonsRow;
  }
}
