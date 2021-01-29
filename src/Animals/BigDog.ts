import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';
import { SmallDog } from './SmallDog';

export class BigDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(AnimalNames.BIG_DOG, 36, AnimalRoles.GUARDIAN);
  }

  // TODO: implement when herd is ready
  protectHerd(): string {
    const exclamation = `${this.name}: WOOF! WOOF! I'm protecting the whole herd! WOOF! WOOF!`;
    SmallDog.showExclamationInTheView(
      exclamation,
      `${this.name.split(' ').join('')}`,
    );
    return exclamation;
  }
}
