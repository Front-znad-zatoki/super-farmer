import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { LivestockConfigInterface } from './LivestockConfigInterface';

export interface ProtectorsConfigInterface
  extends LivestockConfigInterface {
  chasesAway: AnimalNames;
  exclamation: string;
}
