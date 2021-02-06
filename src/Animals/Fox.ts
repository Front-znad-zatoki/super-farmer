import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';
import { SmallDog } from './SmallDog';

export class Fox extends Animal implements AttackHerdInterface {
  constructor() {
    super(
      AnimalNames.FOX,
      './static/images/avatars/fox.png',
      undefined,
      AnimalRoles.PREDATOR,
    );
  }

  // TODO: implement when herd is ready
  attackHerd(): string {
    const exclamation = `${this.name}: Ring-ding-ding-ding-dingeringeding! I ate all rabbits in the herd. Wa-pa-pa-pa-pa-pa-pow!`;
    SmallDog.showExclamationInTheView(exclamation, `${this.name}`);
    return exclamation;
  }
}
