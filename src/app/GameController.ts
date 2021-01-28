import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { BreedProcessor } from './BreedProcessor';
import { Timer } from './Timer';

export class GameController {
  private currentPlayer: Player;
  private player: Player;
  private timer: Timer;
  private breedProcessor: BreedProcessor;
  constructor(playerName: string) {
    this.player = new Player(playerName);
    this.timer = new Timer();
    this.breedProcessor = new BreedProcessor();
    this.currentPlayer = this.player;
  }

  get theCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  get theTimer(): Timer {
    return this.timer;
  }

  startTurn(): void {
    this.timer.countdown();
  }

  breed(): [AnimalNames, AnimalNames] | undefined {
    if (this.timer.theTurnTimeLeft === 0) {
      return;
    }
    const rollResult = this.breedProcessor.processBreedPhase(
      this.currentPlayer,
    );
    return rollResult;
  }

  nextPlayer(): void {
    //TODO multiplayer logic
    this.currentPlayer = this.player;
    this.timer.resetTurn();
  }
}
