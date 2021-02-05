import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { ConvertToAnimalObject } from './utils/ConvertToAnimalObject';
import { multiply } from 'lodash';
import { Player } from '../Player';
import { Herd } from './logic/Herd';

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

  private calculateValue(offer: Offer): number {
    return multiply(
      ConvertToAnimalObject.convertToAnimalObject(offer[0]).theValue,
      offer[1],
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
    playerHerd.addAnimalsToHerd(animalSold, -quantitySold);
    playerHerd.addAnimalsToHerd(animalBought, quantityBought);
    this.bank.theHerd.addAnimalsToHerd(animalSold, quantitySold);
    this.bank.theHerd.addAnimalsToHerd(animalBought, -quantityBought);
    return true;
  }
}
