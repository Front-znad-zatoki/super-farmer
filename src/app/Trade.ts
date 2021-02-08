import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { multiply, sum } from 'lodash';
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
    offer: Offer[],
    { theHerd: playerHerd }: Player,
    target: Offer[],
  ): boolean {
    if (this.areOffersInvalid(offer, playerHerd, target)) {
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

  private areOffersInvalid(
    offer: Offer[],
    playerHerd: Herd,
    target: Offer[],
  ): boolean {
    return (
      (offer.length > 1 && target.length > 1) ||
      this.isOfferQuantityInvalid(offer, playerHerd) ||
      this.isOfferQuantityInvalid(target, this.bank.theHerd) ||
      !this.isSingleQuantityOnAnySide(offer, target)
    );
  }

  private isOfferQuantityInvalid(
    offer: Offer[],
    herd: Herd,
  ): boolean {
    return (
      offer.filter(
        ([animal, count]) => herd.getAnimalNumber(animal) >= count,
      ).length !== offer.length
    );
  }

  private isSingleQuantityOnAnySide(
    offer: Offer[],
    target: Offer[],
  ): boolean {
    return (
      (offer.length === 1 && offer[0][1] === 1) ||
      (target.length === 1 && target[0][1] === 1)
    );
  }

  private calculateValue(offer: Offer[]): number {
    return sum(
      offer.map(([animal, count]) =>
        multiply(
          ConvertAnimalName.toAnimalObject(animal).theValue,
          count,
        ),
      ),
    );
  }

  private adjustOffer(offer: Offer[], target: Offer[]): void {
    this.removeQuantityOfOffer(offer);
    if (this.calculateValue(offer) <= this.calculateValue(target)) {
      return;
    }
    this.adjustOffer(offer, target);
  }

  private removeQuantityOfOffer(offer: Offer[]): void {
    offer[0][1] -= 1;
    if (offer[0][1] === 0) {
      offer.slice();
    }
  }

  /**
   * updates players and banks herd
   */
  private disposeResult(
    offer: Offer[],
    playerHerd: Herd,
    target: Offer[],
  ): boolean {
    offer.forEach(([animal, count]) => {
      playerHerd.removeAnimalsFromHerd(animal, count);
      this.bank.theHerd.addAnimalsToHerd(animal, count);
    });
    target.forEach(([animal, count]) => {
      playerHerd.addAnimalsToHerd(animal, count);
      this.bank.theHerd.removeAnimalsFromHerd(animal, count);
    });
    return true;
  }
}
