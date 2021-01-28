import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice } from './FirstDice';
import { SecondDice } from './SecondDice';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Herd } from './logic/Herd';

export class BreedProcessor {
  randomResultInterfaceWolf: GetRandomValue;
  randomResultInterfaceFox: GetRandomValue;

  constructor() {
    this.randomResultInterfaceWolf = new SecondDice();
    this.randomResultInterfaceFox = new FirstDice();
  }

  processBreedPhase({ theHerd }: Player): [AnimalNames, AnimalNames] {
    const wolfResult = this.randomResultInterfaceWolf.getRandomValue();
    const wolf = this.getRandomResult(wolfResult);
    const foxResult = this.randomResultInterfaceFox.getRandomValue();
    const fox = this.getRandomResult(foxResult);
    if (typeof fox !== 'object') {
      if (typeof wolf !== 'object') {
        this.breedAnimals(fox, wolf, theHerd);
      } else {
        this.breedAnimals(fox, undefined, theHerd);
        theHerd.cullAnimals(wolf);
      }
    } else {
      if (typeof wolf !== 'object') {
        this.breedAnimals(undefined, wolf, theHerd);
        theHerd.cullAnimals(fox);
      } else {
        theHerd.cullAnimals(fox);
        theHerd.cullAnimals(wolf);
      }
    }
    return [wolfResult, foxResult];
  }

  private getRandomResult(
    animalName: AnimalNames,
  ): Wolf | Fox | AnimalNames {
    switch (animalName) {
      case AnimalNames.FOX:
        return new Fox();
      case AnimalNames.WOLF:
        return new Wolf();
      default:
        return animalName;
    }
  }

  private breedAnimals(
    foxDiceAnimalName: AnimalNames | undefined,
    wolfDiceAnimalName: AnimalNames | undefined,
    herd: Herd,
  ) {
    if (
      foxDiceAnimalName &&
      wolfDiceAnimalName &&
      foxDiceAnimalName == wolfDiceAnimalName
    ) {
      const numberOfAnimals = herd.getAnimalNumber(foxDiceAnimalName);
      herd.addAnimals(
        foxDiceAnimalName,
        Math.floor((numberOfAnimals + 2) / 2),
      );
      return;
    }
    if (foxDiceAnimalName) {
      const numberOfAnimals = herd.getAnimalNumber(foxDiceAnimalName);
      herd.addAnimals(
        foxDiceAnimalName,
        Math.floor((numberOfAnimals + 1) / 2),
      );
    }
    if (wolfDiceAnimalName) {
      const numberOfAnimals = herd.getAnimalNumber(
        wolfDiceAnimalName,
      );
      herd.addAnimals(
        wolfDiceAnimalName,
        Math.floor((numberOfAnimals + 1) / 2),
      );
    }
  }
}
