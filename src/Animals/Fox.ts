import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';

export class Fox extends Animal implements AttackHerdInterface {
  constructor() {
    super(AnimalNames.FOX);
  }

  // TODO: implement when herd is ready
  attackHerd(herd: Herd): boolean {
    return true;
  }
}
