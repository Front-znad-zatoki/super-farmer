import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { GameProcessor } from './logic/GameProcessor';
import { ViewController } from './ViewController';
import { Game } from './logic/Game';
import { defaultGameConfiguration } from './logic/defaultGameConfiguration';
import { Bank } from './logic/Bank';

export class GameController {
  private game: Game;
  private gameProcessor: GameProcessor;
  constructor(private view: ViewController) {
    this.game = new Game(defaultGameConfiguration);
    this.gameProcessor = new GameProcessor(this.game, this);
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
    this.gameProcessor.startTurn();
  }

  stopTurn(): void {
    this.gameProcessor.stopTurn();
  }

  pauseTurn(): void {
    this.gameProcessor.pauseTurn();
  }

  turnAlert(): void {
    this.view.turnAlert();
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
    this.isGameWon();
    return tradeResult;
  }

  private isGameWon(): void {
    if (this.gameProcessor.checkWin()) {
      this.gameProcessor.stopTurn();
      this.view.displayWinModal(this.game.theCurrentPlayer);
    }
  }

  /**
   * Rolls the dice for the player and updates their Herd.
   * If player wins the game after the breed, stops the timer and tells the View to display the WinModal.
   */
  breed(): void {
    const diceResult = this.gameProcessor.breed();
    this.isGameWon();
    this.view.updateRollResults(diceResult);
  }

  /**
   * Sets the current player to the next player in order.
   */
  nextPlayer(): void {
    this.gameProcessor.nextPlayer();
    this.view.startGame(
      this.game.thePlayers,
      this.game.theCurrentPlayer,
      this.game.theBank,
    );
  }

  updateTimeRemaining(timeLeft: number): void {
    this.view.updateRemainingTime(timeLeft);
  }

  quitGame(): void {
    this.gameProcessor.quitGame();
  }

  startTrade(): void {
    this.pauseTurn();
    this.view.displayTradeModal(
      this.game.theCurrentPlayer,
      this.game.theTrade,
    );
  }

  resumeTurn(): void {
    this.gameProcessor.resumeGame();
  }

  getBank(): Bank {
    return this.game.theBank;
  }
}
