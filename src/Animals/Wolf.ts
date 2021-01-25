import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';

export class Wolf extends Animal implements AttackHerdInterface {
  constructor() {
    super(AnimalNames.WOLF, undefined, AnimalRoles.PREDATOR);
  }

  // TODO: implement when herd is ready
  attackHerd(): string {
    return `${this.name}: Auuuuuu! I ate all animals in the herd except horses and small dog. Grrrrr!`;
  }
}
