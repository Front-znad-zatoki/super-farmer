import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { Player } from '~src/Player';
import { Game } from './Game';

export class GameProcessor {
  constructor(private game: Game) {}

  startTurn(
    turnTimeOverCallback: (currentPlayer: Player) => void,
    updateRemainingTimeCallback: (remainingTime: number) => void,
  ): void {
    this.game.theTimer.countdown();
    const turnTimer = setInterval(() => {
      if (!this.game.theTimer.running) {
        clearInterval(turnTimer);
        if (Math.ceil(this.game.theTimer.theTurnTimeLeft) === 0) {
          turnTimeOverCallback(this.game.theCurrentPlayer);

          this.nextPlayer();
          this.startTurn(
            turnTimeOverCallback,
            updateRemainingTimeCallback,
          );
        }
      }
      updateRemainingTimeCallback(
        Math.round(this.game.theTimer.theTurnTimeLeft),
      );
    }, 10);
  }

  stopTurn(): void {
    this.game.theTimer.resetTurn();
  }
  //   TODO implement when Trade is merged
  //   trade() {}

  checkWin(): boolean {
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
        return false;
      }
    }
    return true;
  }

  breed(): [AnimalNames, AnimalNames] | undefined {
    if (this.game.theTimer.theTurnTimeLeft === 0) {
      return;
    }
    const rollResult = this.game.theBreedProcessor.processBreedPhase(
      this.game.theCurrentPlayer,
    );
    return rollResult;
  }

  nextPlayer(): void {
    this.game.nextPlayer();
    this.game.theTimer.resetTurn();
  }
}
