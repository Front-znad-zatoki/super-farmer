import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';
import { SmallDog } from './SmallDog';

export class Wolf extends Animal implements AttackHerdInterface {
  constructor() {
    super(
      AnimalNames.WOLF,
      '/static/images/avatars/wolf.png',
      undefined,
      AnimalRoles.PREDATOR,
    );
  }

  // TODO: implement when herd is ready
  attackHerd(): string {
    const exclamation = `${this.name}: Auuuuuu! I ate all animals in the herd except horses and small dog. Grrrrr!`;
    SmallDog.showExclamationInTheView(exclamation, `${this.name}`);
    return exclamation;
  }
}
