import { RandomAnimalInterface } from '../Interfaces/RandomAnimalInterface';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Herd } from './logic/Herd';
import { add, divide, floor, min } from 'lodash';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Bank } from './logic/Bank';
import { ConvertAnimalName } from './utils/ConvertAnimalName';

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
    const firstDiceResult = this.firstDice.getRandomValue();
    const secondDiceResult = this.secondDice.getRandomValue();
    const equalResult = firstDiceResult === secondDiceResult;
    const roll = [firstDiceResult, secondDiceResult];
    if (equalResult) {
      const count = this.breedAnimals(firstDiceResult, theHerd, true);
      return { rollResult: roll, gain: [[firstDiceResult, count]] };
    }
    const gain: [AnimalNames, number][] = [];
    if (firstDiceResult === AnimalNames.FOX) {
      const fox: Fox = ConvertAnimalName.toAnimalObject(
        firstDiceResult,
      ) as Fox;
      this.returnToBank(fox, theHerd);
      theHerd.cullAnimals(fox);
    } else {
      gain.push([
        firstDiceResult,
        this.breedAnimals(firstDiceResult, theHerd),
      ]);
    }
    if (secondDiceResult === AnimalNames.WOLF) {
      const wolf = ConvertAnimalName.toAnimalObject(
        secondDiceResult,
      ) as Wolf;
      this.returnToBank(wolf, theHerd);
      theHerd.cullAnimals(wolf);
    } else {
      gain.push([
        secondDiceResult,
        this.breedAnimals(secondDiceResult, theHerd),
      ]);
    }
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

  private returnToBank(predator: Wolf | Fox, herd: Herd): void {
    if (predator instanceof Fox) {
      if (herd.getAnimalNumber(AnimalNames.SMALL_DOG) > 0) {
        this.bank.theHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 1);
        return;
      }
      const quantity = herd.getAnimalNumber(AnimalNames.RABBIT);
      this.bank.theHerd.addAnimalsToHerd(
        AnimalNames.RABBIT,
        quantity,
      );
      return;
    }
    if (herd.getAnimalNumber(AnimalNames.BIG_DOG) > 0) {
      this.bank.theHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 1);
      return;
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
}
