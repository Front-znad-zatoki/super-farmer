import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Sheep extends Animal {
  constructor() {
    super(AnimalNames.SHEEP, 6, AnimalRoles.LIVESTOCK);
  }
}
