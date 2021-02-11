import { ViewController } from './ViewController';
import { PlayerPanel } from './components/PlayerPanel';
import { Player } from '../Player';
import { Render } from './utils/Render';
// import { ViewController } from './ViewController';
// import { GameView } from './GameView';
export class App {
  init(): void {
    const view = new ViewController();
    view.displayMenuView();
  }
}
//}
