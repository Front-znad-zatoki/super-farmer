import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';

export class BigDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(AnimalNames.BIG_DOG, 36);
  }

  // TODO: implement when herd is ready
  protectHerd(herd: Herd): void {}
}