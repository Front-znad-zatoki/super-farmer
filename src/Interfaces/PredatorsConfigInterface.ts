import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface PredatorsConfigInterface {
  name: AnimalNames;
  path: string;
  kills: AnimalNames[];
  isChasedAwayBy: AnimalNames;
  exclamation: string;
  dice?: { diceNumber: number; probability: number }[];
}
