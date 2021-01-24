import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Animal } from './Animal';

export class Cow extends Animal {
  constructor() {
    super(AnimalNames.COW, 36);
  }
}
