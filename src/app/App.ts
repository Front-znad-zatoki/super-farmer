// import { Player } from '~src/Player';
// import { PlayerPanel } from './components/PlayerPanel';
// import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class App {
  init(): void {
    const view = new ViewController();
    view.displayMenuView();
  }
}
