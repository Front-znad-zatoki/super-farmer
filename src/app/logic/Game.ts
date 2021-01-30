import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';
import { Player } from '~src/Player';
import { BreedProcessor } from '../BreedProcessor';
import { Dice } from '../Dice';
import { FirstDice } from '../FirstDice';
import { SecondDice } from '../SecondDice';
import { Timer } from '../Timer';
import { Bank } from './Bank';
// import { Herd } from './Herd';
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
  dice: Dice[];
  timer: Timer;
  breedProcessor: BreedProcessor;
  // trade, breed processor

  constructor(
    configObject: GameConfigInterface = defaultGameConfiguration,
    // TODO: CHECK HOW TO DESTRUCTURE, IF NOT MAYBE CHANGE CONFIG OBJECT INTO MORE PARAMETERS
    // {mode, roundTimeInSeconds, playersConfig, herdConfig, predatorAnimalsConfig}
  ) {
    this.mode = configObject.mode;
    this.roundTimeInSeconds = configObject.roundTimeInSeconds;
    // TODO: CHECK IF NEEDED FOR ANY TYPE OF GAME this.totalGameTimeInSeconds = configObject.totalGameTimeInSeconds;
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
    // TODO: GET DICE DATA FROM CONFIG AFTER/ IF DICE REFACTOR
    // TODO: CHECK IF NEEDED SINCE THEY ARE CALLED IN BREEDPROCESSOR
    this.dice = [new FirstDice(), new SecondDice()];
    // TODO: CHECK IF TIMER IS CALLED CORRECTLY IN GAME
    this.timer = new Timer(configObject.roundTimeInSeconds);
    // TO CHECK: SHOULD BREED PROCESSOR CREATE DICE INSTANCES?
    this.breedProcessor = new BreedProcessor();
    // TODO: ADD TRADE AFTER TRADE PR APPROVED
    // this.trade = new Trade()
  }

  /**
   * Initializes game with data from initial setup.
   */
  init(): void {
    this.players.forEach(
      // TO CONSIDER: REMOVE INIT METHOD AND MOVE FUNCTIONALITIES TO CONSTRUCTOR
      // TODO: UPDATE WHEN HERD CONSTRUCTOR IS UPDATED
      // (player) => (player.theHerd = new Herd(this.playersHerdConfig)),
      (player) => console.log(player),
    );
    // TODO: UPDATE WHEN HERD CONSTRUCTOR IS UPDATED
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

  get theDice(): Dice[] {
    return this.dice;
  }
  get theTimer(): Timer {
    return this.theTimer;
  }

  get theBreedProcessor(): BreedProcessor {
    return this.breedProcessor;
  }

  // TODO: ADD TRADE AFTER TRADE PR APPROVED
  // get theTrade(): Trade {
  //   return this.trade;
  // }
}
