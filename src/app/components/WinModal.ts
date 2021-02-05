import { Player } from '~src/Player';
import { Render } from '../utils/Render';
import { ModalBasic } from './ModalBasic';

export class WinModal extends ModalBasic {
  create(player: Player): void {
    this.renderBasicModal(
      'CONGRATULATIONS!',
      `${player.theName} has won!`,
      this.createImage(player),
    );
  }

  addButton(): void {
    const handleEnd = () => Render.removeElement('.modal');
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
