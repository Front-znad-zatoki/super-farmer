import { Player } from '../../Player';
import { WinModal } from '../components/WinModal';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';

export class WinModalDemo {
  static playDemo(): void {
    const view = new ViewController();
    const modal = new WinModal();
    const player = new Player(
      'player',
      './static/images/avatars/dog.png',
    );
    modal.create(player);
    modal.addButton(view);
    Render.render('#sf-app', modal.modal);
  }
}
