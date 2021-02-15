import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { multiply, sum } from 'lodash';
import { Player } from '../Player';
import { Herd } from './logic/Herd';
import { LivestockConfigInterface } from '../Interfaces/LivestockConfigInterface';
import { ProtectorsConfigInterface } from '../Interfaces/ProtectorsConfigInterface';

export type Offer = [AnimalNames, number];

export class Trade {
  constructor(
    private bank: Player,
    private livestockConfig: LivestockConfigInterface[],
    private protectorsConfig: ProtectorsConfigInterface[],
  ) {}
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
        this.getValue(animalA) - this.getValue(animalB),
    );
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

  private getValue(animalName: AnimalNames): number {
    return [...this.livestockConfig, ...this.protectorsConfig].filter(
      (animal) => animal.name === animalName,
    )[0].tradeValue;
  }

  private calculateValue(offer: Offer[]): number {
    return sum(
      offer.map(([animal, count]) =>
        multiply(this.getValue(animal), count),
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
    const difference = value - price;
    if (valueOfFirstItem === difference) {
      offer.shift();
      return;
    }
    if (valueOfFirstItem < difference) {
      offer.shift();
      this.adjustOffer(offer, this.calculateValue(offer), price);
      return;
    }
    const singleAnimalCost = valueOfFirstItem / offer[0][1];
    const animalsToRemoveFromOffer = difference / singleAnimalCost;
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
