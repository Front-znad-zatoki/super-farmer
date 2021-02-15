import { GameProcessor } from './logic/GameProcessor';
import { ViewController } from './ViewController';
import { Game } from './logic/Game';
import { Bank } from './logic/Bank';
import { Configuration } from './logic/Configuration';
import { Alert } from './components/Alert';
import { AlertType } from '~src/Enums/AlertEnum';

export class GameController {
  private game: Game;
  private gameProcessor: GameProcessor;
  constructor(
    private view: ViewController,
    private config: Configuration,
  ) {
    this.game = new Game(config);
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
    Alert.updateAlert(
      `${this.game.theCurrentPlayer.theName}'s turn has passed.`,
      AlertType.CRITICAL,
    );
  }

  private isGameWon(): void {
    if (this.gameProcessor.checkWin()) {
      this.view.displayWinModal(this.game.theCurrentPlayer);
    }
  }

  checkIfGameIsWon(): void {
    this.isGameWon();
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
    Alert.updateAlert(
      `${this.game.theCurrentPlayer.theName}'s turn has started.`,
      AlertType.INFO,
    );
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
