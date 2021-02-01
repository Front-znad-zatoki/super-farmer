import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';

export interface LivestockConfigInterface {
  name: AnimalNames;
  tradeValue: number;
  roles: AnimalRoles;
  playersInitialStock?: number;
  bankInitialStock?: number;
  dice?: { diceNumber: number; probability: number }[];
}
