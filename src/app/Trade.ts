import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { multiply } from 'lodash';
import { Player } from '../Player';
import { Herd } from './logic/Herd';
import { ConvertAnimalName } from './utils/ConvertAnimalName';

export type Offer = [AnimalNames, number];

export class Trade {
  constructor(private bank: Player) {}
  get thisBank(): Player {
    return this.bank;
  }
  /**
   * Gets an offer from player and returns true or false if transaction can be made processed and process it if possible
   * @param offer accepts tuple with offer containing animal name and quantity to be sold
   * @param player accepts instance of Player class, which wants to sell his animals
   * @param target accepts tuple with desired animal(s) containing desired animal name and quantity to buy
   * @returns true if transaction will be processed, and false otherwise
   */
  processOffer(
    offer: Offer,
    { theHerd: playerHerd }: Player,
    target: Offer,
  ): boolean {
    const [offeredAnimal, offeredAnimalCount] = offer;
    const [targetAnimal, targetAnimalCount] = target;
    if (
      playerHerd.getAnimalNumber(offeredAnimal) <
        offeredAnimalCount ||
      this.bank.theHerd.getAnimalNumber(targetAnimal) <
        targetAnimalCount
    ) {
      return false;
    }
    let value = this.calculateValue(offer);
    const price = this.calculateValue(target);
    if (price < value) {
      this.adjustOffer(offer, target);
      value = this.calculateValue(offer);
    }
    return price > value
      ? false
      : this.disposeResult(offer, playerHerd, target);
  }

  private calculateValue([animal, count]: Offer): number {
    return multiply(
      ConvertAnimalName.toAnimalObject(animal).theValue,
      count,
    );
  }

  private adjustOffer(offer: Offer, target: Offer): void {
    offer[1] -= 1;
    if (this.calculateValue(offer) <= this.calculateValue(target)) {
      return;
    }
    this.adjustOffer(offer, target);
  }

  /**
   * updates players and banks herd
   */
  private disposeResult(
    [animalSold, quantitySold]: Offer,
    playerHerd: Herd,
    [animalBought, quantityBought]: Offer,
  ): boolean {
    playerHerd.removeAnimalsFromHerd(animalSold, quantitySold);
    playerHerd.addAnimalsToHerd(animalBought, quantityBought);
    this.bank.theHerd.addAnimalsToHerd(animalSold, quantitySold);
    this.bank.theHerd.removeAnimalsFromHerd(
      animalBought,
      quantityBought,
    );
    return true;
  }
}
