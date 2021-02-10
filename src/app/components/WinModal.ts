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
      { className: 'modal__heading' },
      'Congratulations!',
    );
    const image = Render.elementFactory(
      'div',
      { className: 'modal__image--win-container' },
      Render.elementFactory('img', {
        className: 'modal__image--win-avatar',
        src: player.theAvatar,
        alt: `${player.theName}-avatar`,
      }),
      Render.elementFactory('img', {
        className: 'modal__image--win-medal',
        src: './static/images/ui/medal.svg',
        alt: 'medal',
      }),
    );
    const text = Render.elementFactory(
      'div',
      { className: 'modal__text--win' },
      `${player.theName} wins`,
    );
    const button = Render.elementFactory(
      'button',
      { type: 'button', className: 'modal__button--win' },
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
