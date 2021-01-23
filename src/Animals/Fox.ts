import { AnimalNames } from '../Enums/enumAnimalNames';
import { IClearHerd } from '../Interfaces/IClearHerd';
import { Animal } from './Animal';

export class Fox extends Animal implements IClearHerd {
  constructor() {
    super(AnimalNames.FOX);
  }

  // TODO: implement when herd is ready
  clearHerd(herd: Herd): boolean {
    return true;
  }
}
