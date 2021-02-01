import { Value } from '../Animals/Animal';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';

export interface LivestockConfigInterface {
  name: AnimalNames;
  tradeValue: Value;
  path: string;
  role: AnimalRoles;
  playersInitialStock: number;
  bankInitialStock: number;
  dice?: { diceNumber: number; probability: number }[];
}
