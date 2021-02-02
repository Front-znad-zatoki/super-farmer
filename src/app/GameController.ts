// import { time } from 'console';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { GameProcessor } from './logic/GameProcessor';
import { View } from './View';
import { Game } from './logic/Game';
import { defaultGameConfiguration } from './logic/defaultGameConfiguration';

export class GameController {
  private game: Game;
  private gameProcessor: GameProcessor;
  constructor(private view: View) {
    this.game = new Game(defaultGameConfiguration);
    this.gameProcessor = new GameProcessor(this.game);
  }

  get theGame(): Game {
    return this.game;
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

  trade(
    offer: [AnimalNames, number],
    target: [AnimalNames, number],
  ): boolean {
    const tradeResult = this.gameProcessor.trade(offer, target);
    if (this.gameProcessor.checkWin()) {
      this.gameProcessor.stopTurn();
      this.view.displayWinModal(this.game.theCurrentPlayer);
    }
    return tradeResult;
  }

  breed(): [AnimalNames, AnimalNames] | undefined {
    const diceResult = this.gameProcessor.breed();
    if (this.gameProcessor.checkWin()) {
      this.gameProcessor.stopTurn();
      this.view.displayWinModal(this.game.theCurrentPlayer);
    }
    return diceResult;
  }

  nextPlayer(): void {
    this.gameProcessor.nextPlayer();
  }
}
