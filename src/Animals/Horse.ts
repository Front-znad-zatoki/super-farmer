import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Animal } from './Animal';

export class Horse extends Animal {
  constructor() {
    super(AnimalNames.HORSE, 72);
  }
}
