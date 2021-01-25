import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';

export class BigDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(AnimalNames.BIG_DOG, 36, AnimalRoles.GUARDIAN);
  }

  // TODO: implement when herd is ready
  protectHerd(): string {
    return `${this.name}: WOOF! WOOF! I'm saving the whole herd! WOOF! WOOF!`;
  }
}
