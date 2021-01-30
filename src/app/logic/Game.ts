import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';
import { Player } from '~src/Player';
import { Herd } from './Herd';
import { defaultGameConfiguration } from './mockGameConfiguration';

export class Game {
  mode: GameModes;
  roundTimeInSeconds: number;
  // totalGameTimeInSeconds: number;
  // playersConfig: { name: string; path: string }[];
  // bankConfig?: [AnimalNames, number][];
  // farmAnimalsConfig?: [AnimalNames, number][];
  players: Player[];
  // bank: Player;
  // dice: Dice[]
  // timer: Timer
  // trade, breed processor

  constructor(
    configObject: GameConfigInterface = defaultGameConfiguration,
  ) {
    this.mode = configObject.mode;
    this.roundTimeInSeconds = configObject.roundTimeInSeconds;
    // this.totalGameTimeInSeconds = configObject.totalGameTimeInSeconds;
    // this.playersConfig = configObject.playersConfig;
    // this.bankConfig = configObject.bankConfig;
    // this.bank = new Player('BANK', ''); //TODO: CHECK AND IF CHANGE TO BANK
    this.players = [];
    // this.bank = new Bank()
  }

  /**
   * Initializes game with data from initial setup.
   */
  init(): void {
    //TODO: CREATE BANK CONFIGS FOR DIFFERENT MODES
    // this.bank.theHerd = new Herd(60, 24, 20, 12, 4, 4, 2);
    // this.players = this.playersConfig.map((player) => {
    //   const newPlayer = new Player(player.name, player.path);
    //   if (this.mode === GameModes.DYNAMIC) {
    // TODO: CREATE CONFIG TO USE FOR SPECIFIC MODES
    //   newPlayer.theHerd = new Herd(1);
    // }
    console.log(this.mode);
    // return newPlayer;
    // });
  }

  get theMode(): GameModes {
    return this.mode;
  }

  get thePlayers(): Player[] {
    return this.players;
  }

  // get theBank(): Player {
  //   return this.bank;
  // }
  // TODO: TIMER INSTANCE
  // TODO: DICE/ JACKPOT
  // TODO: TRADE, BREED PROCESSOR
}
