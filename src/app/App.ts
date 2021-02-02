import { PlayersBoard } from './components/PlayersBoard';
export class App {
  init(): string {
    const view = new PlayersBoard().renderPlayersBoard(
      'Carlos',
      `../../../static/images/avatars/dog.png`,
    );
    return 'hello world';
  }
}
