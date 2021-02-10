import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice } from './FirstDice';
import { SecondDice } from './SecondDice';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Herd } from './logic/Herd';
import { add, divide, floor, min, pickBy, find } from 'lodash';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { Bank } from './logic/Bank';
import { PredatorsConfigInterface } from '../Interfaces/PredatorsConfigInterface';
import { GameModes } from '../Enums/GameModeEnums';
import { ConvertAnimalName } from './utils/ConvertAnimalName';
import { Predator } from '../../src/Animals/Predator';

export type RollResult = {
  rollResult: AnimalNames[];
  gain: [AnimalNames, number][];
};

export class BreedProcessor {
  randomResultInterfaceWolf: GetRandomValue;
  randomResultInterfaceFox: GetRandomValue;
  mode: GameModes;
  predators: Predator[];
  constructor(
    private bank: Bank,
    // TODO: CREATE PREDATORS INSTANCES (CLASS PREDATOR) BASED ON CONFIG FROM GAME
    predatorConfig: PredatorsConfigInterface[],
    mode: GameModes,
  ) {
    this.randomResultInterfaceWolf = new SecondDice();
    this.randomResultInterfaceFox = new FirstDice();
    // TODO: ADD MODE - NEEDED TO PASS TO CULL ANIMALS TO CHECK HOW MANY TO KILL
    this.mode = mode;
    this.predators = predatorConfig.map(
      ({ name, path, roles, kills, isChasedAwayBy, exclamation }) => {
        return new Predator(
          name,
          path,
          roles,
          kills,
          isChasedAwayBy,
          exclamation,
        );
      },
    );
  }
  getPredatorByName(predatorName: AnimalNames): Predator {
    const attackingPredator = this.predators.find(
      (predator) => predator.theName === predatorName,
    );
    if (!attackingPredator) throw new Error('No such predator');
    console.log(attackingPredator);
    return attackingPredator;
  }

  processBreedPhase({ theHerd }: Player): RollResult {
    console.log(this.mode);
    const wolfDiceResult = this.randomResultInterfaceWolf.getRandomValue();
    const foxDiceResult = this.randomResultInterfaceFox.getRandomValue();
    const equalResult = foxDiceResult === wolfDiceResult;
    const roll = [wolfDiceResult, foxDiceResult];
    if (equalResult) {
      const count = this.breedAnimals(foxDiceResult, theHerd, true);
      return { rollResult: roll, gain: [[foxDiceResult, count]] };
    }
    const gain: [AnimalNames, number][] = [];
    if (foxDiceResult === AnimalNames.FOX) {
      // const fox: Fox = ConvertAnimalName.toAnimalObject(
      //   foxDiceResult,
      // ) as Fox;
      const fox = this.getPredatorByName(AnimalNames.FOX);
      this.returnToBank(fox, theHerd);
      theHerd.cullAnimals(fox, this.mode);
    } else {
      gain.push([
        foxDiceResult,
        this.breedAnimals(foxDiceResult, theHerd),
      ]);
    }
    if (wolfDiceResult === AnimalNames.WOLF) {
      // const wolf = ConvertAnimalName.toAnimalObject(
      //   wolfDiceResult,
      // ) as Wolf;
      const wolf = this.getPredatorByName(AnimalNames.WOLF);
      this.returnToBank(wolf, theHerd);
      theHerd.cullAnimals(wolf, this.mode);
    } else {
      gain.push([
        wolfDiceResult,
        this.breedAnimals(wolfDiceResult, theHerd),
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

  // private returnToBank(predator: Wolf | Fox, herd: Herd): void {
  private returnToBank(predator: Predator, herd: Herd): void {
    if (predator.theName === AnimalNames.FOX) {
      if (herd.getAnimalNumber(AnimalNames.SMALL_DOG) > 0) {
        this.bank.theHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 1);
        return;
      }
      let quantity = herd.getAnimalNumber(AnimalNames.RABBIT);
      //TODO: CHECK WHAT HAPPENS IN DYNAMIC MODE
      if (this.mode === GameModes.DYNAMIC) quantity--;
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
        //TODO: IMPLEMENT CONFIG SETTINGS
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
