import { Player } from '../src/Player';
import { AnimalNames } from '../src/Enums/AnimalNamesEnum';
import { Trade } from '../src/app/Trade';

describe('Trade class test.', () => {
  const bank = new Player('bank');
  bank.theHerd.addAnimalsToHerd(AnimalNames.RABBIT, 60);
  bank.theHerd.addAnimalsToHerd(AnimalNames.SHEEP, 24);
  bank.theHerd.addAnimalsToHerd(AnimalNames.PIG, 20);
  bank.theHerd.addAnimalsToHerd(AnimalNames.COW, 12);
  bank.theHerd.addAnimalsToHerd(AnimalNames.HORSE, 4);
  bank.theHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 4);
  bank.theHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 2);
  const trade = new Trade(bank);
  const player = new Player('player');

  it('Should process trade with correct ammount', () => {
    player.theHerd.addAnimalsToHerd(AnimalNames.RABBIT, 6);
    const offer: [AnimalNames, number] = [AnimalNames.RABBIT, 6];
    const target: [AnimalNames, number] = [AnimalNames.SHEEP, 1];
    const result = trade.processOffer(offer, player, target);
    expect(result).toBe(true);
    expect(player.theHerd.getAnimalNumber(AnimalNames.SHEEP)).toBe(1);
  });

  it('Should not process trade due invalid count', () => {
    player.theHerd.addAnimalsToHerd(AnimalNames.COW, 3);
    const offer: [AnimalNames, number] = [AnimalNames.COW, 3];
    const target: [AnimalNames, number] = [AnimalNames.PIG, 3];
    const result = trade.processOffer(offer, player, target);
    expect(result).toBe(false);
  });

  it('Should not process due to low offer', () => {
    player.theHerd.addAnimalsToHerd(AnimalNames.HORSE, 1);
    const offer: [AnimalNames, number] = [AnimalNames.HORSE, 1];
    const target: [AnimalNames, number] = [AnimalNames.BIG_DOG, 1];
    const result = trade.processOffer(offer, player, target);
    expect(result).toBe(false);
    expect(player.theHerd.getAnimalNumber(AnimalNames.HORSE)).toBe(1);
    expect(player.theHerd.getAnimalNumber(AnimalNames.BIG_DOG)).toBe(
      0,
    );
  });

  it("Should not process if player don't have enougn resources", () => {
    const player2 = new Player('player2');
    const offer: [AnimalNames, number] = [AnimalNames.BIG_DOG, 1];
    const target: [AnimalNames, number] = [AnimalNames.COW, 1];
    const result = trade.processOffer(offer, player2, target);
    expect(result).toBe(false);
    expect(player2.theHerd.getAnimalNumber(AnimalNames.BIG_DOG)).toBe(
      0,
    );
    expect(player2.theHerd.getAnimalNumber(AnimalNames.COW)).toBe(0);
  });
});
