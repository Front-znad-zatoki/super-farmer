import { Player } from '~src/Player';
import { PlayersBoard } from './PlayersBoard';

export class PlayersBoardBuilder {
  static build(player: Player): PlayersBoard {
    const playersBoard = new PlayersBoard(player);
    return playersBoard;
  }
}
