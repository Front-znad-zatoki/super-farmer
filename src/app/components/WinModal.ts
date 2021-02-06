import { Player } from '~src/Player';
import { Render } from '../utils/Render';
import { BasicModal } from './BasicModal';

export class WinModal extends BasicModal {
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
