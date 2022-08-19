import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { GameModes } from '../../Enums/GameModeEnums';
import { GameConfigInterface } from '../../Interfaces/GameConfigInterface';
import { Player } from '../../Player';
import { BreedProcessor } from '../BreedProcessor';
import { Timer } from '../Timer';
import { Trade } from '../Trade';
import { Bank } from './Bank';
import { LivestockConfigInterface } from '../../Interfaces/LivestockConfigInterface';
import { ProtectorsConfigInterface } from '../../Interfaces/ProtectorsConfigInterface';
import { HerdOwners } from '../../Enums/HerdOwnerEnum';
import { AiPlayer } from '../AiPlayer';
import { DiceBuilder } from '../DiceBuilder';

export class Game {
  mode: GameModes;
  roundTimeInSeconds: number;
  playersConfig: { name: string; path: string }[];
  playersHerdConfig: HerdConfigInterface[];
  banksHerdConfig: HerdConfigInterface[];
  players: Player[];
  bank: Bank;
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
  }: GameConfigInterface) {
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
    this.players = [
      ...playersConfig.map((player) =>
        player.isAI
          ? new AiPlayer(
              player.name,
              player.path,
              player.color,
              this.playersHerdConfig,
            )
          : new Player(
              player.name,
              player.path,
              player.color,
              this.playersHerdConfig,
            ),
      ),
    ];
    this.currentPlayerNumber = 0;
    this.bank = new Bank(this.banksHerdConfig);
    const [firstDice, secondDice] = DiceBuilder.build(
      livestockConfig,
      predatorsConfig,
      protectorsConfig,
    );
    this.timer = new Timer(roundTimeInSeconds);
    this.breedProcessor = new BreedProcessor(
      this.bank,
      firstDice,
      secondDice,
      predatorsConfig,
      protectorsConfig,
      this.mode,
    );
    this.trade = new Trade(
      this.bank,
      livestockConfig,
      protectorsConfig,
    );
  }

  nextPlayer(): void {
    this.currentPlayerNumber =
      (this.currentPlayerNumber + 1) % this.players.length;
  }

  get theMode(): GameModes {
    return this.mode;
  }
  get theCurrentPlayerNumber(): number {
    return this.currentPlayerNumber;
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

  get theTimer(): Timer {
    return this.timer;
  }

  get theBreedProcessor(): BreedProcessor {
    return this.breedProcessor;
  }

  get theTrade(): Trade {
    return this.trade;
  }

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
        exclamation,
      }) => {
        return {
          name,
          tradeValue,
          role,
          path,
          chasesAway,
          exclamation,
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
