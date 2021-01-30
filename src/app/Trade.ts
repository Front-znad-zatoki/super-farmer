import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { ConvertToAnimalObject } from './utils/ConvertToAnimalObject';
import { multiply } from 'lodash';
import { Player } from '../Player';
import { Herd } from './logic/Herd';

export class Trade {
  constructor(private bank: Player) {}
  /**
   * Gets an offer from player and returns true or false if transaction can be made processed and process it if possible
   * @param offer accepts tuple with offer containing animal name and quantity to be sold
   * @param player accepts instance of Player class, which wants to sell his animals
   * @param target accepts tuple with desired animal(s) containing desired animal name and quantity to buy
   * @returns true if transaction will be processed, and false otherwise
   */
  processOffer(
    offer: [AnimalNames, number],
    { theHerd: playerHerd }: Player,
    target: [AnimalNames, number],
  ): boolean {
    if (
      playerHerd.getAnimalNumber(offer[0]) < offer[1] ||
      this.bank.theHerd.getAnimalNumber(target[0]) < target[1]
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

  private calculateValue(offer: [AnimalNames, number]): number {
    return multiply(
      ConvertToAnimalObject.convertToAnimalObject(offer[0]).theValue,
      offer[1],
    );
  }

  private adjustOffer(
    offer: [AnimalNames, number],
    target: [AnimalNames, number],
  ): void {
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
    [animalSold, quantitySold]: [AnimalNames, number],
    playerHerd: Herd,
    [animalBought, quantityBought]: [AnimalNames, number],
  ): boolean {
    playerHerd.addAnimals(animalSold, -quantitySold);
    playerHerd.addAnimals(animalBought, quantityBought);
    this.bank.theHerd.addAnimals(animalSold, quantitySold);
    this.bank.theHerd.addAnimals(animalBought, -quantityBought);
    return true;
  }
}
