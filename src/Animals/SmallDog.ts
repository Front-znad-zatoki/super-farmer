import { AnimalNames } from '../Enums/enumAnimalNames';
import { IProtectHerd } from '../Interfaces/IProtectHerd';
import { Animal } from './Animal';

export class SmallDog extends Animal implements IProtectHerd {
  constructor() {
    super(AnimalNames.SMALL_DOG, 6);
  }

  // TODO: implement when herd is ready
  protectHerd(herd: Herd): void {}
}
