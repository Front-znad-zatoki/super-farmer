import { AnimalNames } from '../Enums/enumAnimalNames';
import { Animal } from './Animal';

export class Cow extends Animal {
  constructor() {
    super(AnimalNames.COW, 36);
  }
}
