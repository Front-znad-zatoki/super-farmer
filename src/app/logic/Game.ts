import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';
import { Player } from '~src/Player';
import { Dice } from '../Dice';
import { Bank } from './Bank';
import { Herd } from './Herd';
import { defaultGameConfiguration } from './mockGameConfiguration';
//TODO: CHECK IF LODASH CAN HELP WITH SETTINGS
// import { filter } from 'lodash';

export class Game {
  mode: GameModes;
  roundTimeInSeconds: number;
  // totalGameTimeInSeconds: number;
  playersConfig: { name: string; path: string }[];
  playersHerdConfig: [AnimalNames, number][];
  banksHerdConfig: [AnimalNames, number][];
  players: Player[];
  bank: Bank;
  // dice: Dice[];
  // timer: Timer
  // trade, breed processor

  constructor(
    configObject: GameConfigInterface = defaultGameConfiguration,
    // TODO: CHECK HOW TO DESTRUCTURE, IF NOT MAYBE CHANGE CONFIG OBJECT INTO MORE PARAMETERS
    // {mode, roundTimeInSeconds, playersConfig, herdConfig, predatorAnimalsConfig}
  ) {
    this.mode = configObject.mode;
    this.roundTimeInSeconds = configObject.roundTimeInSeconds;
    // this.totalGameTimeInSeconds = configObject.totalGameTimeInSeconds;
    this.playersConfig = configObject.playersConfig;
    this.playersHerdConfig = configObject.herdConfig.map((animal) => {
      return [animal.name, animal.playersInitialStock];
    });
    this.banksHerdConfig = configObject.herdConfig.map((animal) => {
      return [animal.name, animal.bankInitialStock];
    });
    this.players = configObject.playersConfig.map(
      (player) => new Player(player.name, player.path),
    );
    this.bank = new Bank();
    // this.dice = [];
    // timer: Timer
    // trade, breed processor
  }

  /**
   * Initializes game with data from initial setup.
   */
  init(): void {
    this.players.forEach(
      // (player) => (player.theHerd = new Herd(this.playersHerdConfig)),
      (player) => console.log(player),
    );
    // this.bank.theHerd = new Herd(this.banksHerdConfig);
  }

  get theMode(): GameModes {
    return this.mode;
  }

  get thePlayers(): Player[] {
    return this.players;
  }

  get theBank(): Bank {
    return this.bank;
  }

  // TODO: TIMER INSTANCE
  // TODO: DICE/ JACKPOT
  // TODO: TRADE, BREED PROCESSOR
}
