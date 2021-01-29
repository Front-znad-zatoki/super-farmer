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
    const wolfDiceResult = this.randomResultInterfaceWolf.getRandomValue();
    const foxDiceResult = this.randomResultInterfaceFox.getRandomValue();
    if (foxDiceResult !== AnimalNames.FOX) {
      if (wolfDiceResult !== AnimalNames.WOLF) {
        this.breedAnimals(foxDiceResult, wolfDiceResult, theHerd);
      } else {
        this.breedAnimals(foxDiceResult, undefined, theHerd);
        theHerd.cullAnimals(
          this.getRandomResult(wolfDiceResult) as Wolf,
        );
      }
    } else {
      if (wolfDiceResult !== AnimalNames.WOLF) {
        this.breedAnimals(undefined, wolfDiceResult, theHerd);
        theHerd.cullAnimals(
          this.getRandomResult(foxDiceResult) as Fox,
        );
      } else {
        theHerd.cullAnimals(
          this.getRandomResult(foxDiceResult) as Fox,
        );
        theHerd.cullAnimals(
          this.getRandomResult(wolfDiceResult) as Wolf,
        );
      }
    }
    return [wolfDiceResult, foxDiceResult];
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
