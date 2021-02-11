import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Sheep extends Animal {
  constructor() {
    super(
      AnimalNames.SHEEP,
      './static/images/avatars/sheep.svg',
      6,
      AnimalRoles.LIVESTOCK,
    );
  }
}
