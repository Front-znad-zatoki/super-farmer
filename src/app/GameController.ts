import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { BreedProcessor } from './BreedProcessor';
import { Timer } from './Timer';

export class GameController {
  private currentPlayer: Player;
  constructor(
    private player: Player,
    private timer: Timer,
    private breedProcessor: BreedProcessor,
  ) {
    this.currentPlayer = this.player;
  }
  startTurn(): void {
    this.timer.countdown();
  }

  breed(): [AnimalNames, AnimalNames] | undefined {
    if (this.timer.theTurnTimeLeft === 0) {
      alert('Your time is up!');
      return;
    }
    const rollResult = this.breedProcessor.processBreedPhase(
      this.currentPlayer,
    );
    console.log(this.player.theHerd);
    return rollResult;
  }

  nextPlayer(): void {
    //TODO multiplayer logic
    this.currentPlayer = this.player;
    this.timer.resetTurn();
  }
}
