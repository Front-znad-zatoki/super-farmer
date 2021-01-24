import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Animal } from './Animal';

export class Rabbit extends Animal {
  constructor() {
    super(AnimalNames.RABBIT, 1);
  }
}
