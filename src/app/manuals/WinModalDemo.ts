import { Player } from '../../Player';
import { WinModal } from '../components/WinModal';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';

export class WinModalDemo {
  static playDemo(): void {
    const view = new ViewController();
    const modal = new WinModal(view);
    const player = new Player(
      'player',
      './static/images/avatars/small_dog.svg',
      `#338254`,
    );
    Render.render('#sf-app', modal.createWinModal(player));
  }
}
