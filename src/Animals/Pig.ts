import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Pig extends Animal {
  constructor() {
    super(
      AnimalNames.PIG,
      './static/images/avatars/pig.svg',
      12,
      AnimalRoles.LIVESTOCK,
    );
  }
}
