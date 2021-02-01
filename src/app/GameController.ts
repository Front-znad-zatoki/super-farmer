// import { time } from 'console';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { GameProcessor } from './logic/GameProcessor';
import { View } from './View';
import { Game } from './logic/Game';
import { defaultGameConfiguration } from './logic/defaultGameConfiguration';

export class GameController {
  private gameProcessor: GameProcessor;
  constructor(private view: View) {
    this.gameProcessor = new GameProcessor(
      new Game(defaultGameConfiguration),
    );
  }

  startTurn(): void {
    this.gameProcessor.startTurn(
      (currentPlayer) => {
        this.view.displayAlert(currentPlayer?.theName as string);
      },
      (remainingTime) => {
        this.view.updateRemainingTime(remainingTime);
      },
    );
  }

  stopTurn(): void {
    this.gameProcessor.stopTurn();
  }

  // TODO when Trade is done
  // trade();

  breed(): [AnimalNames, AnimalNames] | undefined {
    const diceResult = this.gameProcessor.breed();
    if (this.gameProcessor.checkWin()) {
      this.gameProcessor.stopTurn();
      //TODO winModal from View
    }
    return diceResult;
  }

  nextPlayer(): void {
    this.gameProcessor.nextPlayer();
  }
}
