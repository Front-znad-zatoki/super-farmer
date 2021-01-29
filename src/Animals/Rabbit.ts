import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Animal } from './Animal';

export class Rabbit extends Animal {
  constructor() {
    super(
      AnimalNames.RABBIT,
      '/static/images/avatars/rabbit.png',
      1,
      AnimalRoles.LIVESTOCK,
    );
  }
}
