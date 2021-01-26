import { Dice } from './Dice';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export class FirstDice extends Dice {
  constructor() {
    super([
      AnimalNames.RABBIT,
      AnimalNames.RABBIT,
      AnimalNames.RABBIT,
      AnimalNames.RABBIT,
      AnimalNames.RABBIT,
      AnimalNames.RABBIT,
      AnimalNames.SHEEP,
      AnimalNames.SHEEP,
      AnimalNames.PIG,
      AnimalNames.PIG,
      AnimalNames.HORSE,
      AnimalNames.FOX,
    ]);
  }
}
