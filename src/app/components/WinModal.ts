import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';
import { BasicModal } from './BasicModal';

export class WinModal extends BasicModal {
  constructor(private view: ViewController) {
    super();
  }

  createWinModal(player: Player): HTMLElement {
    this.renderBasicModal(
      'CONGRATULATIONS!',
      `${player.theName} has won!`,
      this.createImage(player),
    );
    this.addButton();
    return this.modal;
  }

  private addButton(): void {
    const handleEnd = () => {
      Render.removeElement('.modal');
      this.view.displayMenuView();
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
