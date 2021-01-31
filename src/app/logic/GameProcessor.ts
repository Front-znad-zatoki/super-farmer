import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { Game } from './Game';

export class GameProcessor {
  constructor(private game: Game) {}

  //   TODO implement when Trade is merged
  //   trade() {}

  checkWin(): void {
    this.game.theCurrentPlayer;
    const animalsRequiredToWin: AnimalNames[] = [
      AnimalNames.RABBIT,
      AnimalNames.SHEEP,
      AnimalNames.PIG,
      AnimalNames.COW,
      AnimalNames.HORSE,
    ];
    for (const animal in animalsRequiredToWin) {
      if (
        this.game.theCurrentPlayer.theHerd.getAnimalNumber(
          animal as AnimalNames,
        ) === 0
      ) {
        return;
      }
    }
    //TODO winner
  }

  //   breed() {}

  //   nextPlayer() {}
}
