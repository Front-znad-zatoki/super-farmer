import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Animal } from './Animal';

export class Pig extends Animal {
  constructor() {
    super(AnimalNames.PIG, 12);
  }
}
