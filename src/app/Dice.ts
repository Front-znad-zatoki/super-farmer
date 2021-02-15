import { RandomAnimalInterface } from '../Interfaces/RandomAnimalInterface';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { sample, shuffle } from 'lodash';

export class Dice implements RandomAnimalInterface {
  private dice: AnimalNames[] = [];

  /**
   * adds animals names to dice sides in quantity of probability
   * @param animal accepts AnimalNames with desired animal on side
   * @param probability accepts number with number of sides with this animal
   */
  addSide(animal: AnimalNames, probability: number): void {
    if (probability === 0) {
      return;
    }
    this.dice.push(animal);
    this.addSide(animal, probability - 1);
  }

  /**
   * Returns random animal
   */
  getRandomValue(): AnimalNames {
    this.dice = shuffle(this.dice);
    return sample(this.dice) as AnimalNames;
  }
}
