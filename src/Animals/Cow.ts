import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Cow extends Animal {
  constructor() {
    super(
      AnimalNames.COW,
      './static/images/avatars/cow.png',
      36,
      AnimalRoles.LIVESTOCK,
    );
  }
}
