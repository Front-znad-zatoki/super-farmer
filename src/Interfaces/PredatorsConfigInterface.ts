import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface PredatorsConfigInterface {
  name: AnimalNames;
  kills: AnimalNames[];
  isChasedAwayBy: AnimalNames[];
  dice?: { diceNumber: number; probability: number }[];
}
