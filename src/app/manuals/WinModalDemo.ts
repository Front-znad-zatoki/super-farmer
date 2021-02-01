import { Player } from '../../Player';
import { WinModal } from '../components/WinModal';
import { Render } from '../utils/Render';

export class WinModalDemo {
  static playDemo(): void {
    const modal = new WinModal();
    const player = new Player(
      'player',
      './static/images/avatars/dog.png',
    );
    modal.create(player);
    modal.addButton();
    Render.render('#sf-app', modal.modal);
  }
}
