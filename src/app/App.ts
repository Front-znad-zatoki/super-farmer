// import { Player } from '~src/Player';
// import { PlayerPanel } from './components/PlayerPanel';
// import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class App {
  init(): void {
    const view = new ViewController();
    view.displayMenuView();
    // const viewController = new ViewController();
    // const player = new Player(
    // 'Misha',
    // './static/images/avatars/sheep.svg',
    // '#44AF95',
    // );
    // const pp = new PlayerPanel(viewController.theGameView);
    // pp.setPlayer(player);
    // Render.render('#sf-app', pp.createPlayerPanel());
  }
}
