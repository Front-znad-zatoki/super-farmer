import { Player } from '../../Player';
import { PlayerPanel } from '../components/PlayerPanel';
import { Render } from '../utils/Render';
import { ViewController } from '../ViewController';

export class PlayerPanelDemo {
  static playDemo(): void {
    const viewController = new ViewController();
    const player = new Player(
      'Misha',
      './static/images/avatars/sheep.png',
      '#44AF95',
    );
    Render.render(
      '#sf-app',
      new PlayerPanel(
        player,
        viewController.theGameView,
      ).createPlayerPanel(),
    );
  }
}
