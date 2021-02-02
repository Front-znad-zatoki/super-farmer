import { LivestockConfigInterface } from '../../Interfaces/LivestockConfigInterface';
import { PredatorsConfigInterface } from '../../Interfaces/PredatorsConfigInterface';
import { ProtectorsConfigInterface } from '../../Interfaces/ProtectorsConfigInterface';
import { GameModes } from '../../Enums/GameModeEnums';
import { GameConfigInterface } from '../../Interfaces/GameConfigInterface';

export class Configuration implements GameConfigInterface {
  protected _mode: GameModes;
  protected _roundTimeInSeconds: number;
  protected _playersConfig: {
    name: string;
    path: string;
    color: string;
  }[];
  protected _livestockConfig: LivestockConfigInterface[];
  protected _protectorsConfig: ProtectorsConfigInterface[];
  protected _predatorsConfig: PredatorsConfigInterface[];
  // protected dice: Dice;

  constructor({
    mode,
    roundTimeInSeconds,
    playersConfig,
    livestockConfig,
    protectorsConfig,
    predatorsConfig,
  }: GameConfigInterface) {
    this._mode = mode;
    this._roundTimeInSeconds = roundTimeInSeconds;
    this._playersConfig = playersConfig;
    this._livestockConfig = livestockConfig;
    this._protectorsConfig = protectorsConfig;
    this._predatorsConfig = predatorsConfig;
    // this.dice = dice
  }
  totalGameTimeInSeconds?: number | undefined;

  set mode(newMode: GameModes) {
    this._mode = newMode;
  }
  get mode(): GameModes {
    return this._mode;
  }
  set roundTimeInSeconds(numberOfSeconds: number) {
    this.roundTimeInSeconds = numberOfSeconds;
  }
  get roundTimeInSeconds(): number {
    return this.roundTimeInSeconds;
  }
  //TODO: CREATE PLAYER CONFIG INTERFACE
  set playersConfig(
    newPlayersConfig: {
      name: string;
      path: string;
      color: string;
    }[],
  ) {
    this._playersConfig = newPlayersConfig;
  }
  get playersConfig(): {
    name: string;
    path: string;
    color: string;
  }[] {
    return this._playersConfig;
  }

  set livestockConfig(
    newLivestockConfig: LivestockConfigInterface[],
  ) {
    this._livestockConfig = newLivestockConfig;
  }

  get livestockConfig(): LivestockConfigInterface[] {
    return this._livestockConfig;
  }

  set protectorsConfig(
    newProtectorsConfig: ProtectorsConfigInterface[],
  ) {
    this._livestockConfig = newProtectorsConfig;
  }

  get protectorsConfig(): ProtectorsConfigInterface[] {
    return this._protectorsConfig;
  }

  set predatorsConfig(
    newPredatorsConfig: PredatorsConfigInterface[],
  ) {
    this._predatorsConfig = newPredatorsConfig;
  }

  get predatorsConfig(): PredatorsConfigInterface[] {
    return this._predatorsConfig;
  }

  addNewPlayer(newPlayerConfig: {
    name: string;
    path: string;
    color: string;
  }): void {
    this._playersConfig.concat(newPlayerConfig);
  }

  // TODO: ADD NEW LIVESTOCK, PREDATOR, PROTECTOR ETC.
}
