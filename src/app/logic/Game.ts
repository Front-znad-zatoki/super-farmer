import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { GameModes } from '../../Enums/GameModeEnums';
import { GameConfigInterface } from '../../Interfaces/GameConfigInterface';
import { Player } from '../../Player';
import { BreedProcessor } from '../BreedProcessor';
// import { Dice } from '../Dice';
// import { FirstDice } from '../FirstDice';
// import { SecondDice } from '../SecondDice';
import { Timer } from '../Timer';
import { Trade } from '../Trade';
import { Bank } from './Bank';
import { defaultGameConfiguration } from './defaultGameConfiguration';
import { LivestockConfigInterface } from '../../Interfaces/LivestockConfigInterface';
import { ProtectorsConfigInterface } from '../../Interfaces/ProtectorsConfigInterface';
import { HerdOwners } from '../../Enums/HerdOwnerEnum';

export class Game {
  mode: GameModes;
  roundTimeInSeconds: number;
  // totalGameTimeInSeconds: number;
  playersConfig: { name: string; path: string }[];
  playersHerdConfig: HerdConfigInterface[];
  banksHerdConfig: HerdConfigInterface[];
  players: Player[];
  bank: Bank;
  // dice: Dice[];
  timer: Timer;
  breedProcessor: BreedProcessor;
  trade: Trade;
  private currentPlayerNumber: number;
  constructor({
    mode,
    roundTimeInSeconds,
    playersConfig,
    livestockConfig,
    protectorsConfig,
    predatorsConfig,
  }: GameConfigInterface = defaultGameConfiguration) {
    this.mode = mode;
    this.roundTimeInSeconds = roundTimeInSeconds;
    this.playersConfig = playersConfig;
    this.playersHerdConfig = this.preparePlayersHerdConfig(
      livestockConfig,
      protectorsConfig,
      HerdOwners.PLAYER,
    );
    this.banksHerdConfig = this.preparePlayersHerdConfig(
      livestockConfig,
      protectorsConfig,
      HerdOwners.BANK,
    );
    this.players = playersConfig.map(
      (player) =>
        new Player(
          player.name,
          player.path,
          player.color,
          this.playersHerdConfig,
        ),
    );
    this.currentPlayerNumber = 0;
    this.bank = new Bank(this.banksHerdConfig);
    // TODO: GET DICE DATA FROM CONFIG AFTER/ IF DICE REFACTOR
    // TODO: CHECK IF NEEDED SINCE THEY ARE CALLED IN BREEDPROCESSOR
    // this.dice = [new FirstDice(), new SecondDice()];
    this.timer = new Timer(roundTimeInSeconds);
    // TO CHECK: SHOULD BREED PROCESSOR CREATE DICE INSTANCES?
    this.breedProcessor = new BreedProcessor(
      this.bank,
      predatorsConfig,
      this.mode,
    );
    this.trade = new Trade(this.bank);
  }

  nextPlayer(): void {
    this.currentPlayerNumber =
      (this.currentPlayerNumber + 1) % this.players.length;
  }

  get theMode(): GameModes {
    return this.mode;
  }

  get thePlayers(): Player[] {
    return this.players;
  }

  get theCurrentPlayer(): Player {
    return this.players[this.currentPlayerNumber];
  }

  get theBank(): Bank {
    return this.bank;
  }

  // get theDice(): Dice[] {
  //   return this.dice;
  // }
  get theTimer(): Timer {
    return this.theTimer;
  }

  get theBreedProcessor(): BreedProcessor {
    return this.breedProcessor;
  }

  get theTrade(): Trade {
    return this.trade;
  }

  // TODO: REFACTOR!
  preparePlayersHerdConfig(
    livestockConfig: LivestockConfigInterface[],
    protectorsConfig: ProtectorsConfigInterface[],
    owner: HerdOwners,
  ): HerdConfigInterface[] {
    const herdLivestockConfig: HerdConfigInterface[] = livestockConfig.map(
      ({
        name,
        tradeValue,
        role,
        path,
        playersInitialStock,
        bankInitialStock,
      }) => {
        return {
          name,
          tradeValue,
          role,
          path,
          inStock:
            owner === HerdOwners.PLAYER
              ? playersInitialStock
              : bankInitialStock,
        };
      },
    );
    const herdProtectorsConfig: HerdConfigInterface[] = protectorsConfig.map(
      ({
        name,
        tradeValue,
        role,
        path,
        playersInitialStock,
        bankInitialStock,
        chasesAway,
      }) => {
        return {
          name,
          tradeValue,
          role,
          path,
          chasesAway,
          inStock:
            owner === HerdOwners.PLAYER
              ? playersInitialStock
              : bankInitialStock,
        };
      },
    );
    const herdConfig = herdLivestockConfig.concat(
      herdProtectorsConfig,
    );
    return herdConfig;
  }
}
