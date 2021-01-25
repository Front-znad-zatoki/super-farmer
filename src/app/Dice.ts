import { GetRandomValue } from './Interfaces/DiceInterface';
import { AnimalNames } from './Enums/AnimalNamesEnum';

class Dice implements GetRandomValue {
  constructor(private diceSides: AnimalNames[]) {}
  getRandomValue(): AnimalNames {
    return this.diceSides[Math.floor(Math.random() * 12)];
  }
}

class FirstDice extends Dice {
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

class SecondDice extends Dice {
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
