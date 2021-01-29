import { Render } from './utils/Render';
import { View } from './View';
import { PlayersBoard } from '../app/components/PlayersBoard';

export class App {
  init(): string {
    /*const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );*/
    //  const view = new View().renderMenuView();
    const view = new PlayersBoard().renderPlayersBoard(
      '../../static/images/avatars/sheep.png',
      'Carlos Santana',
    );

    return 'hello world';
  }
}
