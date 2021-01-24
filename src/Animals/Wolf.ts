import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';
import { Animal } from './Animal';

export class Wolf extends Animal implements AttackHerdInterface {
  constructor() {
    super(AnimalNames.WOLF);
  }

  // TODO: implement when herd is ready
  attackHerd(herd: Herd): boolean {
    return true;
  }
}
