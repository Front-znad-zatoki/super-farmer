import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice } from './FirstDice';
import { SecondDice } from './SecondDice';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Herd } from './logic/Herd';
import { ConvertToAnimalObject } from './utils/ConvertToAnimalObject';
import { add, divide, floor, min } from 'lodash';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Bank } from './logic/Bank';
import { PredatorsConfigInterface } from '../Interfaces/PredatorsConfigInterface';

export class BreedProcessor {
  randomResultInterfaceWolf: GetRandomValue;
  randomResultInterfaceFox: GetRandomValue;

  constructor(
    private bank: Bank,
    // TODO: CREATE PREDATORS INSTANCES (CLASS PREDATOR) BASED ON CONFIG FROM GAME
    predatorConfig: PredatorsConfigInterface[],
  ) {
    console.log(predatorConfig);
    this.randomResultInterfaceWolf = new SecondDice();
    this.randomResultInterfaceFox = new FirstDice();
  }

  processBreedPhase({ theHerd }: Player): [AnimalNames, AnimalNames] {
    const wolfDiceResult = this.randomResultInterfaceWolf.getRandomValue();
    const foxDiceResult = this.randomResultInterfaceFox.getRandomValue();
    const equalResult = foxDiceResult === wolfDiceResult;
    if (equalResult) {
      this.breedAnimals(foxDiceResult, theHerd, true);
      return [wolfDiceResult, foxDiceResult];
    }
    if (foxDiceResult === AnimalNames.FOX) {
      const fox: Fox = ConvertToAnimalObject.convertToAnimalObject(
        foxDiceResult,
      ) as Fox;
      this.returnToBank(fox, theHerd);
      theHerd.cullAnimals(fox);
    } else {
      this.breedAnimals(foxDiceResult, theHerd);
    }
    if (wolfDiceResult === AnimalNames.WOLF) {
      const wolf = ConvertToAnimalObject.convertToAnimalObject(
        wolfDiceResult,
      ) as Wolf;
      this.returnToBank(wolf, theHerd);
      theHerd.cullAnimals(wolf);
    } else {
      this.breedAnimals(wolfDiceResult, theHerd);
    }
    return [wolfDiceResult, foxDiceResult];
  }

  private breedAnimals(
    diceResult: AnimalNames,
    herd: Herd,
    isDoubled?: boolean,
  ): void {
    if (isDoubled) {
      const herdGrow = this.calculateHerdGrow(
        diceResult,
        herd,
        isDoubled,
      );
      this.bank.theHerd.addAnimalsToHerd(diceResult, -herdGrow);
      herd.addAnimalsToHerd(diceResult, herdGrow);
      return;
    }
    const herdGrow = this.calculateHerdGrow(diceResult, herd);
    this.bank.theHerd.addAnimalsToHerd(diceResult, -herdGrow);
    herd.addAnimalsToHerd(diceResult, herdGrow);
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
