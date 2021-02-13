import { RandomAnimalInterface } from '../Interfaces/RandomAnimalInterface';
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
  predators: Predator[];

  constructor(
    private bank: Bank,
    private firstDice: RandomAnimalInterface,
    private secondDice: RandomAnimalInterface,
    predatorConfig: PredatorsConfigInterface[],
    private mode: GameModes,
  ) {
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
    return attackingPredator;
  }

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
        const predator = this.getPredatorByName(animal);
        const isHerdCulled = this.returnToBank(predator, theHerd);
        if (isHerdCulled && gain.length > 0) {
          this.reduceGain(predator, gain);
        }
        predator.attackHerd();
        theHerd.cullAnimals(predator, this.mode);
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

  private returnToBank(predator: Predator, herd: Herd): boolean {
    const animalsToCull = predator.kills;
    const protector = predator.isChasedAwayBy;
    const hasProtector = herd.getAnimalNumber(protector);
    const isDynamicMode = this.mode === GameModes.DYNAMIC;
    const killsRabbits = animalsToCull.includes(AnimalNames.RABBIT);
    if (hasProtector) {
      this.bank.theHerd.addAnimalsToHerd(protector, 1);
      return false;
    }

    herd.theAnimals
      .filter(([animal]) =>
        animalsToCull.includes(animal.theName as AnimalNames),
      )
      .forEach(([animal, count]) =>
        this.bank.theHerd.addAnimalsToHerd(
          animal.theName as AnimalNames,
          count,
        ),
      );
    if (isDynamicMode && killsRabbits) {
      this.bank.theHerd.removeAnimalsFromHerd(AnimalNames.RABBIT, 1);
    }
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
    predator: Predator,
    animalsGain: [AnimalNames, number][],
  ): void {
    if (predator.theName === AnimalNames.WOLF) {
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
    if (predator.theName === AnimalNames.FOX) {
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
