import { Render } from '../utils/Render';

export class Button {
  /**
   * Creates a button with a given text.
   * @param {string} text Text to render inside the button.
   * @return {HTMLElement} The button element created with Render.elementFactory method.
   */
  create(text: string): HTMLElement {
    return Render.elementFactory(
      'button',
      { className: 'button' },
      text,
    );
  }
}
