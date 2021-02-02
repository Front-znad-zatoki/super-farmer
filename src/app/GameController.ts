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

  /**
   * Starts the turn for the current player.
   * Displays alert when the time is over.
   * Updates the remaining time on the View.
   */
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

  /**
   * Executes trade proposed by the player and checks win condition.
   * If player wins the game after the trade, stops the timer and tells the View to display the WinModal.
   * @param offer made by the player
   * @param target desired by the player
   * @returns true if the trade was sucessful, false otherwise
   */
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

  /**
   * Rolls the dice for the player and updates their Herd.
   * If player wins the game after the breed, stops the timer and tells the View to display the WinModal.
   */
  breed(): [AnimalNames, AnimalNames] | undefined {
    const diceResult = this.gameProcessor.breed();
    if (this.gameProcessor.checkWin()) {
      this.gameProcessor.stopTurn();
      this.view.displayWinModal(this.game.theCurrentPlayer);
    }
    return diceResult;
  }

  /**
   * Sets the current player to the next player in order.
   */
  nextPlayer(): void {
    this.gameProcessor.nextPlayer();
  }
}
