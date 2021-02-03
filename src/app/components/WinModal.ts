import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';
import { ModalBasic } from './ModalBasic';

export class WinModal extends ModalBasic {
  create(player: Player): void {
    this.renderBasicModal(
      'CONGRATULATIONS!',
      `${player.theName} has won!`,
      this.createImage(player),
    ) as WinModal;
  }

  addButton(view: ViewController): void {
    const handleEnd = () => {
      Render.removeElement('.modal');
      view.displayMenuView();
    };
    this.createAndAppendButtonsRow(
      'End game - back to menu',
      handleEnd,
    );
  }

  private createImage({ theName, theAvatar }: Player): HTMLElement {
    return Render.elementFactory('img', {
      src: theAvatar,
      alt: `${theName}-avatar`,
    });
  }
}
