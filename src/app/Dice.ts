import { GetRandomValue } from '../Interfaces/DiceInterface';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { sample } from 'lodash';

export class Dice implements GetRandomValue {
  constructor(private diceSides: AnimalNames[]) {}
  getRandomValue(): AnimalNames {
    return sample(this.diceSides) as AnimalNames;
  }
}

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
