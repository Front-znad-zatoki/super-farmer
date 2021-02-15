import { Player } from '../../Player';
import { PlayerPanel } from '../components/PlayerPanel';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';

export class PlayerPanelDemo {
  static playDemo(): void {
    const viewController = new ViewController();
    const player = new Player(
      'Misha',
      './static/images/avatars/sheep.svg',
      '#44AF95',
    );
    const pp = new PlayerPanel(viewController.theGameView);
    // pp.setPlayer(player);
    Render.render('#sf-app', pp.createPlayerPanel(player));
  }
}
