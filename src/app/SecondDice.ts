import { Dice } from './Dice';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export class SecondDice extends Dice {
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
      AnimalNames.SHEEP,
      AnimalNames.PIG,
      AnimalNames.COW,
      AnimalNames.WOLF,
    ]);
  }
}
