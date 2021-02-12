import { RandomAnimalInterface } from '../Interfaces/RandomAnimalInterface';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Herd } from './logic/Herd';
import { add, divide, floor, min } from 'lodash';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Bank } from './logic/Bank';
import { AttackHerdInterface } from '../Interfaces/AttackHerdInterface';

export type RollResult = {
  rollResult: AnimalNames[];
  gain: [AnimalNames, number][];
};

export class BreedProcessor {
  constructor(
    private bank: Bank,
    private firstDice: RandomAnimalInterface,
    private secondDice: RandomAnimalInterface,
  ) {}

  processBreedPhase({ theHerd }: Player): RollResult {
    const roll = [
      this.firstDice.getRandomValue(),
      this.secondDice.getRandomValue(),
    ];
    const [firstDice, secondDice] = roll;
    if (firstDice === secondDice) {
      const count = this.breedAnimals(firstDice, theHerd, true);
      return {
        rollResult: roll,
        gain: count ? [[firstDice, count]] : [],
      };
    }
    const gain: [AnimalNames, number][] = [];
    roll
      .filter((animal) => !this.isPredator(animal))
      .forEach((animal) => {
        const grow = this.breedAnimals(animal, theHerd);
        if (grow) {
          gain.push([animal, grow]);
        }
      });
    roll
      .filter((animal) => this.isPredator(animal))
      .forEach((animal) => {
        const predator = this.getPredatorObject(animal);
        const isHerdCulled = this.returnToBank(predator, theHerd);
        if (isHerdCulled && gain.length > 0) {
          this.reduceGain(predator, gain);
        }
        predator.attackHerd();
        theHerd.cullAnimals(
          predator instanceof Wolf ? predator : (predator as Fox),
        );
      });
    return { rollResult: roll, gain: gain };
  }

  private breedAnimals(
    diceResult: AnimalNames,
    herd: Herd,
    isDoubled?: boolean,
  ): number {
    if (isDoubled) {
      const herdGrow = this.calculateHerdGrow(
        diceResult,
        herd,
        isDoubled,
      );
      this.bank.theHerd.removeAnimalsFromHerd(diceResult, herdGrow);
      herd.addAnimalsToHerd(diceResult, herdGrow);
      return herdGrow;
    }
    const herdGrow = this.calculateHerdGrow(diceResult, herd);
    this.bank.theHerd.removeAnimalsFromHerd(diceResult, herdGrow);
    herd.addAnimalsToHerd(diceResult, herdGrow);
    return herdGrow;
  }

  private isPredator(animal: AnimalNames): boolean {
    return animal === AnimalNames.FOX || animal === AnimalNames.WOLF;
  }

  private getPredatorObject(
    animal: AnimalNames,
  ): AttackHerdInterface {
    switch (animal) {
      case AnimalNames.FOX:
        return new Fox();
      case AnimalNames.WOLF:
        return new Wolf();
      default:
        throw Error(`Error: unknown animal name: ${animal}`);
    }
  }

  private returnToBank(
    predator: AttackHerdInterface,
    herd: Herd,
  ): boolean {
    if (predator instanceof Fox) {
      if (herd.getAnimalNumber(AnimalNames.SMALL_DOG) > 0) {
        this.bank.theHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 1);
        return false;
      }
      const quantity = herd.getAnimalNumber(AnimalNames.RABBIT);
      this.bank.theHerd.addAnimalsToHerd(
        AnimalNames.RABBIT,
        quantity,
      );
      return true;
    }
    if (herd.getAnimalNumber(AnimalNames.BIG_DOG) > 0) {
      this.bank.theHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 1);
      return false;
    }
    herd.theAnimals
      .filter(
        ([animal]) =>
          animal.hasRole(AnimalRoles.LIVESTOCK) &&
          animal.theName !== AnimalNames.HORSE,
      )
      .forEach(([animal, count]) =>
        this.bank.theHerd.addAnimalsToHerd(
          animal.theName as AnimalNames,
          count,
        ),
      );
    return true;
  }

  private calculateHerdGrow(
    diceResult: AnimalNames,
    herd: Herd,
    isDoubled?: boolean,
  ): number {
    const herdMaxGrow = floor(
      divide(
        add(herd.getAnimalNumber(diceResult), isDoubled ? 2 : 1),
        2,
      ),
    );
    const bankContains = this.bank.theHerd.getAnimalNumber(
      diceResult,
    );
    return min([herdMaxGrow, bankContains]) as number;
  }

  private reduceGain(
    predator: AttackHerdInterface,
    animalsGain: [AnimalNames, number][],
  ): void {
    if (predator instanceof Wolf) {
      const horseIndex = this.getAnimalIndex(
        animalsGain,
        AnimalNames.HORSE,
      );
      if (horseIndex === -1) {
        animalsGain.splice(0);
      } else {
        animalsGain.splice(0, horseIndex);
        animalsGain.splice(1, animalsGain.length);
      }
    }
    if (predator instanceof Fox) {
      const rabbitIndex = this.getAnimalIndex(
        animalsGain,
        AnimalNames.RABBIT,
      );
      if (rabbitIndex !== -1) {
        animalsGain.splice(rabbitIndex, 1);
      }
    }
  }

  private getAnimalIndex(
    animalsGain: [AnimalNames, number][],
    animal: AnimalNames,
  ): number {
    const animalCount = animalsGain
      .filter(([animalName]) => animal === animalName)
      .map(([, count]) => count)
      .pop();
    return animalCount !== undefined
      ? animalsGain.indexOf([animal, animalCount])
      : -1;
  }
}
