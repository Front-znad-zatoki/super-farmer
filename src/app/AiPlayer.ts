import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
import { Player } from '../Player';
import { GameController } from './GameController';
import { Offer } from './Trade';
import { ConvertAnimalName } from './utils/ConvertAnimalName';

export class AiPlayer extends Player {
  /**
   * Makes a move for AI Player
   * @param gameController for the game that the player is participating in
   */
  makeAMove(gameController: GameController): void {
    this.trade(gameController);
    if (gameController.theGameProcessor.checkWin()) {
      gameController.checkIfGameIsWon();
      return;
    }
    gameController.breed();
    if (gameController.theGameProcessor.checkWin()) {
      gameController.checkIfGameIsWon();
      return;
    }
  }
  private trade(gameController: GameController): void {
    //Try to win the game by trading one to many if possible
    const oneToManyTrades: [AnimalNames, Offer[]][] = [
      [
        AnimalNames.HORSE,
        [
          [AnimalNames.COW, 1],
          [AnimalNames.PIG, 1],
          [AnimalNames.SHEEP, 3],
          [AnimalNames.RABBIT, 6],
        ],
      ],
      [
        AnimalNames.COW,
        [
          [AnimalNames.PIG, 1],
          [AnimalNames.SHEEP, 3],
          [AnimalNames.RABBIT, 6],
        ],
      ],
      [
        AnimalNames.PIG,
        [
          [AnimalNames.SHEEP, 1],
          [AnimalNames.RABBIT, 6],
        ],
      ],
      [AnimalNames.SHEEP, [[AnimalNames.RABBIT, 6]]],
    ];
    for (const [animalToSell, target] of oneToManyTrades) {
      if (this.herd.getAnimalNumber(animalToSell) > 1) {
        const offer: Offer[] = [[animalToSell, 1]];
        if (
          gameController.theGame.theTrade.processOffer(
            offer,
            this,
            target,
          )
        ) {
          return;
        }
      } else if (this.herd.getAnimalNumber(animalToSell) === 0) {
        break;
      }
    }

    //Try to win by trading many to one (possible if only one kind of animal is missing)
    const animalsInOrder = [
      AnimalNames.HORSE,
      AnimalNames.COW,
      AnimalNames.PIG,
      AnimalNames.SHEEP,
      AnimalNames.RABBIT,
    ];

    const missingAnimals = animalsInOrder.filter(
      (animal) => this.herd.getAnimalNumber(animal) === 0,
    );

    if (missingAnimals.length === 1) {
      const offer = this.animalsForTrade();
      const target: Offer[] = [[missingAnimals[0], 1]];
      if (
        gameController.theGame.theTrade.processOffer(
          offer,
          this,
          target,
        )
      ) {
        return;
      }
    }
    //Cannot win game by trade. Check if buying dogs is worth it
    if (this.buyABigDog()) {
      if (
        gameController.theGame.theTrade.processOffer(
          [[AnimalNames.PIG, 3]],
          this,
          [[AnimalNames.BIG_DOG, 1]],
        )
      ) {
        return;
      } else if (
        gameController.theGame.theTrade.processOffer(
          [[AnimalNames.COW, 1]],
          this,
          [[AnimalNames.BIG_DOG, 1]],
        )
      ) {
        return;
      }
    }

    if (this.buyASmallDog()) {
      const offer: Offer[] = [[AnimalNames.RABBIT, 6]];
      const target: Offer[] = [[AnimalNames.SMALL_DOG, 1]];
      if (
        gameController.theGame.theTrade.processOffer(
          offer,
          this,
          target,
        )
      ) {
        return;
      }
    }

    //If we don't need any dogs, try to buy the most expensive animal we can afford
    for (const missingAnimal of missingAnimals) {
      const offer = this.animalsForTrade(missingAnimal);
      const target: Offer[] = [[missingAnimal, 1]];
      if (
        gameController.theGame.theTrade.processOffer(
          offer,
          this,
          target,
        )
      ) {
        return;
      }
    }
  }

  private animalsForTrade(
    targetAnimal: AnimalNames = AnimalNames.HORSE,
  ): [AnimalNames, number][] {
    const animalsForTrade: [AnimalNames, number][] = [];
    this.herd.theAnimals.forEach(([animal, count]) => {
      if (
        count > 1 &&
        animal.theValue <
          ConvertAnimalName.toAnimalObject(targetAnimal).theValue &&
        !animal.theRoles.includes(AnimalRoles.GUARDIAN)
      ) {
        animalsForTrade.push([
          animal.theName as AnimalNames,
          count - 1,
        ]);
      }
    });
    return animalsForTrade;
  }

  //Counts value of animals without horse and guardians to decide whether to buy a dog or not
  private getAnimalsValue(): number {
    let sum = 0;
    this.herd.theAnimals.forEach(([animal, count]) => {
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
    return (
      this.herd.getAnimalNumber(AnimalNames.BIG_DOG) === 0 &&
      this.getAnimalsValue() >= 72
    );
  }

  private buyASmallDog(): boolean {
    return (
      this.herd.getAnimalNumber(AnimalNames.SMALL_DOG) === 0 &&
      this.herd.getAnimalNumber(AnimalNames.RABBIT) >= 12
    );
  }
}
