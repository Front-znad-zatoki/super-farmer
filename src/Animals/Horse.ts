import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Horse extends Animal {
  constructor() {
    super(AnimalNames.HORSE, 72, AnimalRoles.LIVESTOCK);
  }
}
