import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';

export class SmallDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(AnimalNames.SMALL_DOG, 6);
  }

  // TODO: implement when herd is ready
  protectHerd(herd: Herd): void {}
}
