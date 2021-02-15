import { Player } from '~src/Player';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { RollResult } from '../BreedProcessor';
import { GameController } from '../GameController';
import { Game } from './Game';

export class GameProcessor {
  constructor(
    private game: Game,
    private gameController: GameController,
  ) {}

  /**
   * Starts the timer for current players turn.
   * When the time is over, resets the timer, sets current player to the next player and starts the timer.
   * @param turnTimeOverCallback to be executed when the time is over
   * @param updateRemainingTimeCallback to be executed when the remaining time changes
   */
  startTurn(): void {
    this.game.theTimer.countdown();
    const turnTimer = setInterval((player: Player) => {
      if (!this.game.theTimer.running) {
        clearInterval(turnTimer);
        if (Math.round(this.game.theTimer.theTurnTimeLeft) === 0) {
          this.gameController.turnAlert(player);
        }
        if (!this.game.theTimer.hasGameEnded) {
          setTimeout(() => {
            this.gameController.nextPlayer();
          }, 3000);
        }
      }
      this.gameController.updateTimeRemaining(
        Math.round(this.game.theTimer.theTurnTimeLeft),
      );
    }, 100);
  }

  pauseTurn(): void {
    this.game.theTimer.pauseTime();
  }

  resumeGame(): void {
    this.game.theTimer.resumeTime();
  }

  /**
   * Stops the timer for the current player.
   */
  stopTurn(): void {
    this.game.theTimer.resetTurn();
  }

  /**
   * @returns true if current player wins the game, false otherwise
   */
  // TODO: Consider moving win conditions to configuration
  checkWin(): boolean {
    const animalsRequiredToWin: AnimalNames[] = [
      AnimalNames.RABBIT,
      AnimalNames.SHEEP,
      AnimalNames.PIG,
      AnimalNames.COW,
      AnimalNames.HORSE,
    ];
    for (const animal of animalsRequiredToWin) {
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

  /**
   * Rolls the dice for the player and updates their Herd.
   * @returns the result of the current players roll
   */
  breed(): RollResult {
    if (!this.hasTimeLeft()) {
      return { rollResult: [], gain: [] };
    }
    const rollResult = this.game.theBreedProcessor.processBreedPhase(
      this.game.theCurrentPlayer,
    );
    return rollResult;
  }

  /**
   * Sets the current player to the next player in order and resets the timer.
   */
  nextPlayer(): void {
    this.game.nextPlayer();
    this.game.theTimer.resetTurn();
  }

  private hasTimeLeft(): boolean {
    return this.game.theTimer.running;
  }

  quitGame(): void {
    this.game.theTimer.quitGame();
  }
}
