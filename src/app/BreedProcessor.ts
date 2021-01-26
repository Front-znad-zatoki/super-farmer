import { GetRandomValue } from '../Interfaces/DiceInterface';
import { FirstDice } from './FirstDice';
import { SecondDice } from './SecondDice';
import { Player } from '../Player';
import { Animal } from '../Animals/Animal';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Fox } from '../Animals/Fox';
import { Wolf } from '../Animals/Wolf';
import { Render } from './utils/Render';

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
    const herd = player.theHerd;
    if (typeof fox !== 'object') {
      this.breedAnimals(fox, herd);
    } else if (typeof wolf !== 'object') {
      this.breedAnimals(wolf, herd);
    } else {
      this.breedAnimals(wolf.theName as AnimalNames, herd);
    }
  }

  private getRandomResult(
    animalName: AnimalNames,
  ): Animal | AnimalNames {
    switch (animalName) {
      case AnimalNames.FOX:
        return new Fox();
      case AnimalNames.WOLF:
        return new Wolf();
      default:
        return animalName;
    }
  }

  private breedAnimals(animalName: AnimalNames, herd: Herd) {
    console.log('do smth');
  }
}
