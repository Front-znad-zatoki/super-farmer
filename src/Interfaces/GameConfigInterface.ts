import { GameModes } from '~src/Enums/GameModeEnums';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds: number;
  playersConfig: { name: string; path: string }[];
  bankConfig?: [AnimalNames, number][];
  farmAnimalsConfig?: [AnimalNames, number][];
}
