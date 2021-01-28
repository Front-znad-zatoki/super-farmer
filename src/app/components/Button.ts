import { Render } from '../utils/Render';

export class Button {
  create(text: string): HTMLElement {
    return Render.elementFactory(
      'button',
      { className: 'button' },
      text,
    );
  }
}
