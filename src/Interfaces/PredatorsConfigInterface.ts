import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface PredatorsConfigInterface {
  name: AnimalNames;
  path: string;
  roles: AnimalRoles;
  kills: AnimalNames[];
  isChasedAwayBy: AnimalNames;
  exclamation: string;
  dice?: { diceNumber: number; probability: number }[];
}
