import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';

export class Fox extends Animal implements AttackHerdInterface {
  constructor() {
    super(AnimalNames.FOX);
  }

  // TODO: implement when herd is ready
  attackHerd(): string {
    return `${this.name}: Ring-ding-ding-ding-dingeringeding! I ate all rabbits in the herd. Wa-pa-pa-pa-pa-pa-pow!`;
  }
}
