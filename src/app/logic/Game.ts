import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameModes } from '../../Enums/GameModeEnums';
import { GameConfigInterface } from '../../Interfaces/GameConfigInterface';
import { Player } from '../../Player';
import { BreedProcessor } from '../BreedProcessor';
import { Dice } from '../Dice';
import { FirstDice } from '../FirstDice';
import { SecondDice } from '../SecondDice';
import { Timer } from '../Timer';
import { Bank } from './Bank';
// import { Herd } from './Herd';
import { defaultGameConfiguration } from './defaultGameConfiguration';
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
  //TODO: ADD TRADE AFTER IT IS MERGED
  constructor(
    // configObject: GameConfigInterface = defaultGameConfiguration,
    {
      mode,
      roundTimeInSeconds,
      playersConfig,
      herdConfig,
      // TODO: DEFINE THE NECESSITY TO CREATE: this.predators
      predatorAnimalsConfig,
    }: GameConfigInterface = defaultGameConfiguration,
  ) {
    this.mode = mode;
    this.roundTimeInSeconds = roundTimeInSeconds;
    this.playersConfig = playersConfig;
    this.playersHerdConfig = herdConfig.map((animal) => {
      return [animal.name, animal.playersInitialStock];
    });
    this.banksHerdConfig = herdConfig.map((animal) => {
      return [animal.name, animal.bankInitialStock];
    });
    this.players = playersConfig.map(
      (player) =>
        new Player(
          player.name,
          player.path,
          player.color,
          this.playersHerdConfig,
        ),
    );
    this.bank = new Bank(this.banksHerdConfig);
    // TODO: GET DICE DATA FROM CONFIG AFTER/ IF DICE REFACTOR
    // TODO: CHECK IF NEEDED SINCE THEY ARE CALLED IN BREEDPROCESSOR
    this.dice = [new FirstDice(), new SecondDice()];
    // TODO: CHECK IF TIMER IS CALLED CORRECTLY IN GAME
    this.timer = new Timer(roundTimeInSeconds);
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
      // TODO: DEFINE IF NECESSARY
      (player) => console.log(player),
    );
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
