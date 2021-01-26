import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice, SecondDice } from './Dice';
import { Player } from '../Player';
import { Animal } from '../Animals/Animal';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Cow } from '../Animals/Cow';
import { Fox } from '../Animals/Fox';
import { Horse } from '../Animals/Horse';
import { Pig } from '../Animals/Pig';
import { Rabbit } from '../Animals/Rabbit';
import { Sheep } from '../Animals/Sheep';
import { Wolf } from '../Animals/Wolf';

export class BreedProcessor {
  randomResultInterfaceWolf: GetRandomValue;
  randomResultInterfaceFox: GetRandomValue;

  constructor() {
    this.randomResultInterfaceWolf = new SecondDice();
    this.randomResultInterfaceFox = new FirstDice();
  }

  processBreedPhase(player: Player): void {
    const wolf = this.getRandomResult(
      this.randomResultInterfaceWolf.getRandomValue(),
    );
    const fox = this.getRandomResult(
      this.randomResultInterfaceFox.getRandomValue(),
    );
  }

  private getRandomResult(animalName: AnimalNames): Animal {
    switch (animalName) {
      case AnimalNames.COW:
        return new Cow();
      case AnimalNames.FOX:
        return new Fox();
      case AnimalNames.HORSE:
        return new Horse();
      case AnimalNames.PIG:
        return new Pig();
      case AnimalNames.RABBIT:
        return new Rabbit();
      case AnimalNames.SHEEP:
        return new Sheep();
      case AnimalNames.WOLF:
        return new Wolf();
      default:
        throw Error(`unknown animal name: ${animalName}`);
    }
  }
}
