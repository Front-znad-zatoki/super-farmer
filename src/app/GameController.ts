import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { BreedProcessor } from './BreedProcessor';
import { Bank } from './logic/Bank';
import { Timer } from './Timer';
import { ViewController } from './ViewController';

export class GameController {
  private currentPlayer: Player | undefined;
  private player: Player | undefined;
  private timer: Timer;
  private breedProcessor: BreedProcessor;
  constructor(private view: ViewController) {
    this.timer = new Timer();
    this.breedProcessor = new BreedProcessor(new Bank());
  }

  get theCurrentPlayer(): Player {
    return this.currentPlayer as Player;
  }

  get theTimer(): Timer {
    return this.timer;
  }

  startTurn(): void {
    this.timer.countdown();
    const turnTimer = setInterval(() => {
      if (!this.timer.running) {
        clearInterval(turnTimer);
        if (Math.ceil(this.timer.theTurnTimeLeft) === 0) {
          this.view.displayAlert(
            this.currentPlayer?.theName as string,
          );
          this.nextPlayer();
          this.startTurn();
        }
      }
      this.view.updateRemainingTime(
        Math.round(this.timer.theTurnTimeLeft),
      );
    }, 10);
  }

  breed(): [AnimalNames, AnimalNames] | undefined {
    if (this.timer.theTurnTimeLeft === 0) {
      return;
    }
    const rollResult = this.breedProcessor.processBreedPhase(
      this.currentPlayer as Player,
    );
    return rollResult;
  }

  stopTurn(): void {
    this.timer.resetTurn();
  }

  nextPlayer(): void {
    //TODO multiplayer logic
    this.currentPlayer = this.player;
    this.timer.resetTurn();
  }
}
