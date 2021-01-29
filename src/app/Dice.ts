import { GetRandomValue } from '../Interfaces/DiceInterface';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { sample } from 'lodash';

export class Dice implements GetRandomValue {
  constructor(private diceSides: AnimalNames[]) {}
  getRandomValue(): AnimalNames {
    return sample(this.diceSides) as AnimalNames;
  }
}
