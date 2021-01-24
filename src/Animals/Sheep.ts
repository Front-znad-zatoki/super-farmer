import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Animal } from './Animal';

export class Sheep extends Animal {
  constructor() {
    super(AnimalNames.SHEEP, 6);
  }
}
