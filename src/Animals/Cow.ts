import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Cow extends Animal {
  constructor() {
    super(AnimalNames.COW, 36, AnimalRoles.LIVESTOCK);
  }
}
