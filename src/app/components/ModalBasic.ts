import { Render } from '../utils/Render';
import { Button } from './Button';
import { EmptyModal } from './EmptyModal';

export class ModalBasic extends EmptyModal {
  /**
   * Creates and appends the main modal structure.
   * @param {string} heading Heading to be render inside the modal.
   * @param {string} text Additional description or text to be inserted below heading.
   * @param {HTMLElement} modalContent Content of modal to render below heading and description.
   * @return {ModalBasic} The modal object.
   */
  protected renderBasicModal(
    heading: string,
    text: string,
    modalContent?: HTMLElement,
  ): void {
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
  }

  /**
   * Creates and appends the modal content.
   * @param { string | HTMLElement } content Content of modal to render below heading and description.
   * @return {ModalBasic} The model's object.
   */
  protected addModalContent(content: string | HTMLElement): void {
    Render.childrenInjector(this.modalContainer, content);
  }

  /**
   * Creates and appends the buttons row on the bottom of the modal.
   * @param {string} leftButtonText Text to be rendered in the left button.
   * @param {function} leftButtonAction Function to be added to the click listener of the left button.
   * @param {string} rightButtonText Text to be rendered in the right button.
   * @param {function} rigthButtonAction Function to be added to the click listener of the right button.
   * @return {ModalBasic} The model's object.
   */
  protected createAndAppendButtonsRow(
    leftButtonText: string,
    leftButtonAction: () => void,
    rightButtonText?: string,
    rightButtonAction?: () => void,
  ): void {
    const leftButton: HTMLElement = new Button().create(
      leftButtonText,
    );
    const rightButton: HTMLElement | null = rightButtonText
      ? new Button().create(rightButtonText)
      : null;
    if (rightButton && rightButtonAction) {
      rightButton.addEventListener('click', rightButtonAction);
    }
    leftButton.addEventListener('click', leftButtonAction);
    const buttonsRow = Render.elementFactory(
      'div',
      {
        className: 'modal__buttons',
      },
      leftButton,
      rightButton ? rightButton : '',
    );
    Render.childrenInjector(this.modalContainer, buttonsRow);
  }
}
