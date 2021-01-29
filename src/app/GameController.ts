import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { BreedProcessor } from './BreedProcessor';
import { Timer } from './Timer';
import { View } from './View';

export class GameController {
  private currentPlayer: Player | undefined;
  private player: Player | undefined;
  private timer: Timer;
  private breedProcessor: BreedProcessor;
  constructor(private view: View) {
    this.timer = new Timer();
    this.breedProcessor = new BreedProcessor(new Player('bank'));
  }

  get theCurrentPlayer(): Player {
    return this.currentPlayer as Player;
  }

  get theTimer(): Timer {
    return this.timer;
  }

  initializePlayer(name: string, imgPath: string): Player {
    this.player = new Player(name, imgPath);
    this.currentPlayer = this.player;
    return this.player;
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
