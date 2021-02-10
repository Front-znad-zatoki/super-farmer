import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';
import { EmptyModal } from './EmptyModal';

export class WinModal extends EmptyModal {
  constructor(private view: ViewController) {
    super();
  }

  createWinModal(player: Player): HTMLElement {
    const heading = Render.elementFactory(
      'h2',
      { className: 'modal__win-heading' },
      'Congratulations!',
    );
    const image = Render.elementFactory(
      'div',
      { className: 'modal__win-image' },
      Render.elementFactory('img', {
        className: 'modal__win-avatar',
        src: player.theAvatar,
        alt: `${player.theName}-avatar`,
      }),
      Render.elementFactory('img', {
        className: 'modal__win-medal',
        src: './static/images/ui/medal.svg',
        alt: 'medal',
      }),
    );
    const text = Render.elementFactory(
      'div',
      { className: 'modal__win-text' },
      `${player.theName} wins`,
    );
    const button = Render.elementFactory(
      'button',
      { type: 'submit', className: 'modal__win-button' },
      'MENU',
    );
    button.addEventListener('click', () =>
      this.view.displayMenuView(),
    );
    Render.childrenInjector(
      this.modalContainer,
      heading,
      image,
      text,
      button,
    );
    return this.modal;
  }
}
