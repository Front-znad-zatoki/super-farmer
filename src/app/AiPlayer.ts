import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
import { Player } from '../Player';
import { GameController } from './GameController';

export class AiPlayer extends Player {
  makeAMove(gameController: GameController): void {
    this.trade();
    gameController.breed();
    gameController.nextPlayer();
    setTimeout(() => gameController.startTurn(), 50);
  }
  private trade(): void {
    //If the player has two horses, trade one of them for animals they don't have
    if (this.theHerd.getAnimalNumber(AnimalNames.HORSE) > 1) {
      const animalsToCheck: AnimalNames[] = [
        AnimalNames.COW,
        AnimalNames.PIG,
        AnimalNames.SHEEP,
        AnimalNames.RABBIT,
      ];
      const targetAnimals: [AnimalNames, number][] = [];
      animalsToCheck.forEach((animal) => {
        if (this.theHerd.getAnimalNumber(animal) === 0) {
          targetAnimals.push([animal, 1]);
        }
      });
      //TODO trade horse for animals that you don't have (targetAnimals)
      return;
    }
    if (this.buyABigDog()) {
      //trade animals for a big dog
      return;
    }

    if (this.buyASmallDog()) {
      //trade rabbits for a small dog
      return;
    }
    //
  }
  private animalsForTrade(): [AnimalNames, number][] {
    const animalsForTrade: [AnimalNames, number][] = [];
    this.theHerd.theAnimals.forEach(([animal, count]) => {
      if (count > 1) {
        animalsForTrade.push([
          animal.theName as AnimalNames,
          count - 1,
        ]);
      }
    });
    return animalsForTrade;
  }

  private getAnimalsValue(): number {
    let sum = 0;
    this.theHerd.theAnimals.forEach(([animal, count]) => {
      if (
        animal.theName !== AnimalNames.HORSE &&
        !animal.theRoles.includes(AnimalRoles.GUARDIAN)
      ) {
        sum = sum + count * animal.theValue;
      }
    });
    return sum;
  }

  private buyABigDog(): boolean {
    return this.getAnimalsValue() >= 36;
  }

  private buyASmallDog(): boolean {
    return this.theHerd.getAnimalNumber(AnimalNames.RABBIT) >= 6;
  }
}
