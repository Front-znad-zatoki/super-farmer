import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice } from './FirstDice';
import { SecondDice } from './SecondDice';
import { Player } from '../Player';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Herd } from './logic/Herd';
import { add, divide, floor, min } from 'lodash';
import { Bank } from './logic/Bank';
import { PredatorsConfigInterface } from '../Interfaces/PredatorsConfigInterface';
import { GameModes } from '../Enums/GameModeEnums';
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
    predatorConfig: PredatorsConfigInterface[],
    mode: GameModes,
  ) {
    this.randomResultInterfaceWolf = new SecondDice();
    this.randomResultInterfaceFox = new FirstDice();
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

  private returnToBank(predator: Predator, herd: Herd): void {
    const animalsToCull = predator.kills;
    const protector = predator.isChasedAwayBy;
    const hasProtector = herd.getAnimalNumber(protector);
    const isDynamicMode = this.mode === GameModes.DYNAMIC;
    const killsRabbits = animalsToCull.includes(AnimalNames.RABBIT);
    if (hasProtector) {
      console.log('has protector');
      return this.bank.theHerd.addAnimalsToHerd(protector, 1);
    }

    herd.theAnimals
      .filter(([animal]) => {
        return animalsToCull.includes(animal.theName as AnimalNames);
      })
      .forEach(([animal, count]) => {
        this.bank.theHerd.addAnimalsToHerd(
          animal.theName as AnimalNames,
          count,
        );
      });

    if (isDynamicMode && killsRabbits) {
      this.bank.theHerd.removeAnimalsFromHerd(AnimalNames.RABBIT, 1);
    }
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
