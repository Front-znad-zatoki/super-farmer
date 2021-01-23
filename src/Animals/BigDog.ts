import { AnimalNames } from '../Enums/enumAnimalNames';
import { IProtectHerd } from '../Interfaces/IProtectHerd';
import { Animal } from './Animal';

export class BigDog extends Animal implements IProtectHerd {
  constructor() {
    super(AnimalNames.BIG_DOG, 36);
  }

  // TODO: implement when herd is ready
  protectHerd(herd: Herd): void {}
}
