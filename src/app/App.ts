import { Player } from '../Player';
import { Render } from './utils/Render';
import { PlayersBoard } from './components/PlayersBoard';
import { mockHerdConfig } from './logic/mockHerdConfig';
import { ViewController } from './ViewController';
export class App {
  init(): void {
    const view = new ViewController();
    view.displayMenuView();
    const playersBoard = new PlayersBoard();

    // const playersView = playersBoard.renderPlayersBoard(
    // new Player(
    // 'gangam',

    // './static/images/avatars/dog.png',

    // 'jjjs',

    // mockHerdConfig,
    // ),
    // );

    // Render.render('#sf-app', playersView);
  }
}
//}
