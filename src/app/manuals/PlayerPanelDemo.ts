import { Player } from '../../Player';
import { PlayerPanel } from '../components/PlayerPanel';
import { Render } from '../utils/Render';
import { View } from '../View';

export class PlayerPanelDemo {
  static playDemo(): void {
    const view = new View();
    const player = new Player(
      'Misha',
      './static/images/avatars/sheep.png',
      '#44AF95',
    );
    Render.render(
      '#sf-app',
      new PlayerPanel(player, view).createPlayerPanel(),
    );
  }
}