import { GameModes } from '../Enums/GameModeEnums';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds?: number;
  playersConfig: { name: string; path: string }[];
  farmAnimalsConfig: {
    name: AnimalNames;
    bankStock: number;
    playersFarmStock: number;
  }[];
  // playerConfig?: [AnimalNames, number][];
  // bankConfig?: [AnimalNames, number][];
  predatorAnimalsConfig: {
    name: AnimalNames;
    kills: AnimalNames[];
    isChasedAwayBy: [AnimalNames];
  }[];
  diceConfig: { name: AnimalNames; probability: number }[][];
}
