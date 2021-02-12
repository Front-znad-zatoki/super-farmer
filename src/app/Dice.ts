import { RandomAnimalInterface } from '../Interfaces/RandomAnimalInterface';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { sample, shuffle } from 'lodash';

export class Dice implements RandomAnimalInterface {
  private dice: AnimalNames[] = [];

  addSide(animal: AnimalNames, probability: number): void {
    if (probability === 0) {
      return;
    }
    this.dice.push(animal);
    this.addSide(animal, probability - 1);
  }

  getRandomValue(): AnimalNames {
    console.log(JSON.stringify(this.dice));
    this.dice = shuffle(this.dice);
    console.log(JSON.stringify(this.dice));
    return sample(this.dice) as AnimalNames;
  }
}
