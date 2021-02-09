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
   * @param offer accepts array of tuple with offer containing animal name and quantity to be sold
   * @param player accepts instance of Player class, which wants to sell his animals
   * @param target accepts array of tuple with desired animal(s) containing desired animal name and quantity to buy
   * @returns true if transaction is processed, and false otherwise
   */
  processOffer(
    offer: Offer[],
    { theHerd: playerHerd }: Player,
    target: Offer[],
  ): boolean {
    if (this.areOffersInvalid(offer, playerHerd, target)) {
      return false;
    }
    offer.sort(
      ([animalA], [animalB]) =>
        ConvertAnimalName.toAnimalObject(animalA).theValue -
        ConvertAnimalName.toAnimalObject(animalB).theValue,
    );
    console.log(offer);
    let value = this.calculateValue(offer);
    const price = this.calculateValue(target);
    if (price < value) {
      if (this.containsOneItem(offer)) {
        if (this.calculateBankValue() !== price) {
          return false;
        }
        this.disposeResult(offer, playerHerd, target);
        return true;
      } else {
        this.adjustOffer(offer, value, price);
        value = this.calculateValue(offer);
      }
    }
    if (price > value) {
      return false;
    }
    this.disposeResult(offer, playerHerd, target);
    return true;
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
      this.areQuantityOnSidesInvalid(offer, target)
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

  private areQuantityOnSidesInvalid(
    offer: Offer[],
    target: Offer[],
  ): boolean {
    return !(
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

  private containsOneItem(offer: Offer[]): boolean {
    return offer.length === 1 && offer[0][1] === 1;
  }

  private calculateBankValue(): number {
    return sum(
      this.bank.theHerd.theAnimals.map(([animal, count]) =>
        multiply(animal.theValue, count),
      ),
    );
  }

  /**
   * Adjusts player offer for exchange in bank
   * @param offer accepts array of tuple
   * @param value accepts number equal to value of offer
   * @param price accepts number equal to desired target
   */
  private adjustOffer(
    offer: Offer[],
    value: number,
    price: number,
  ): void {
    const valueOfFirstItem = this.calculateValue([offer[0]]);
    const differece = value - price;
    if (valueOfFirstItem === differece) {
      offer.shift();
      return;
    }
    if (valueOfFirstItem < differece) {
      offer.shift();
      this.adjustOffer(offer, this.calculateValue(offer), price);
      return;
    }
    const singleAnimalCost = valueOfFirstItem / offer[0][1];
    const animalsToRemoveFromOffer = differece / singleAnimalCost;
    offer[0][1] -= Math.round(animalsToRemoveFromOffer);
  }

  /**
   * updates players and banks herd
   */
  private disposeResult(
    offer: Offer[],
    playerHerd: Herd,
    target: Offer[],
  ): void {
    offer.forEach(([animal, count]) => {
      playerHerd.removeAnimalsFromHerd(animal, count);
      this.bank.theHerd.addAnimalsToHerd(animal, count);
    });
    target.forEach(([animal, count]) => {
      playerHerd.addAnimalsToHerd(animal, count);
      this.bank.theHerd.removeAnimalsFromHerd(animal, count);
    });
  }
}
