import { PlayersBoard } from '../app/components/PlayersBoard';

export class App {
  init(): string {
    const view = new PlayersBoard().renderPlayersBoard(
      '../../static/images/avatars/sheep.png',
      'Carlos Santana',
      'red',
    );

    return 'hello world';
  }
}
