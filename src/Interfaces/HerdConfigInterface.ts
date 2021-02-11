import { Value } from '../Animals/Animal';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';

export interface HerdConfigInterface {
  name: AnimalNames;
  tradeValue: Value;
  role: AnimalRoles;
  path: string;
  inStock: number;
  chasesAway?: AnimalNames | undefined;
  exclamation?: string | undefined;
}
