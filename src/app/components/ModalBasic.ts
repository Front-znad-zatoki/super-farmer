import { Render } from '../utils/Render';
import { Button } from './Button';

export class ModalBasic {
  renderBasicModal(
    heading: string,
    text: string,
    modalContent?: HTMLElement,
  ): HTMLElement {
    const handleModalClose = () => {
      //TODO: WRITE LOGIC
      Render.removeElement('.modal');
    };
    const handlePlayGame = () => {
      //TODO: WRITE LOGIC
      Render.removeElement('.modal');
    };
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
    const buttonsRow = this.renderBottomButtons(
      'GO BACK',
      handleModalClose,
      'PLAY',
      handlePlayGame,
    );
    const modalContainer = Render.elementFactory(
      'div',
      {
        className: 'modal__container',
      },
      modalHeader,
      modalText,
      modalContent ? modalContent : '',
      buttonsRow,
    );
    const modal = Render.elementFactory(
      'div',
      { className: 'modal' },
      modalContainer,
    );
    return modal;
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
