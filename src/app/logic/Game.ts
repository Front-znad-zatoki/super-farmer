import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';
import { Player } from '~src/Player';
import { Herd } from './Herd';

export class Game implements GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds: number;
  playersConfig: { name: string; path: string }[];
  bankConfig?: [AnimalNames, number][];
  farmAnimalsConfig?: [AnimalNames, number][];
  players: Player[];
  bank: Player;

  constructor(configObject: GameConfigInterface) {
    this.mode = configObject.mode;
    this.roundTimeInSeconds = configObject.roundTimeInSeconds;
    this.totalGameTimeInSeconds = configObject.totalGameTimeInSeconds;
    this.playersConfig = configObject.playersConfig;
    this.bankConfig = configObject.bankConfig;
    this.bank = new Player('BANK', '');
    this.players = [];
  }

  /**
   * Initializes game with data from initial setup.
   */
  init(): void {
    //TODO: CREATE BANK CONFIGS FOR DIFFERENT MODES
    this.bank.theHerd = new Herd(60, 24, 20, 12, 4, 4, 2);
    this.players = this.playersConfig.map((player) => {
      const newPlayer = new Player(player.name, player.path);
      if (this.mode === GameModes.DYNAMIC) {
        // TODO: CREATE CONFIG TO USE FOR SPECIFIC MODES
        newPlayer.theHerd = new Herd(1, 0, 0, 0, 0, 0, 0);
      }
      console.log(newPlayer);
      return newPlayer;
    });
  }

  get theMode(): GameModes {
    return this.mode;
  }

  get thePlayers(): Player[] {
    return this.players;
  }

  get theBank(): Player {
    return this.bank;
  }

  // IS THIS IN GAME OR GAME CONTROLLER?
  //TODO: GET WINNER FROM GAME CONTROLLER?
  end(winner: Player): void {
    console.log('GAME OVER ' + winner);
    //TODO: SHOW MODAL WITH GAME OVER AND CONGRATULATION
  }
}
