import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Player } from '../../Player';
import { Bank } from '../logic/Bank';
import { defaultGameConfiguration } from '../logic/defaultGameConfiguration';
import { Offer, Trade } from '../Trade';

// To run this demo add TradeDemo.playDemo() in App.ts

export class TradeDemo {
  static playDemo(): void {
    const bank = new Bank();
    const trade = new Trade(
      bank,
      defaultGameConfiguration.livestockConfig,
    );
    const player = new Player('player');
    player.theHerd.addAnimalsToHerd(AnimalNames.SHEEP, 9);
    player.theHerd.addAnimalsToHerd(AnimalNames.PIG, 5);
    player.theHerd.addAnimalsToHerd(AnimalNames.COW, 2);
    const offer: Offer[] = [
      [AnimalNames.SHEEP, 9],
      [AnimalNames.PIG, 2],
    ];
    const target: Offer[] = [[AnimalNames.COW, 1]];

    trade.processOffer(offer, player, target);

    console.log(player.theHerd);
    console.log(bank.theHerd);
  }
}
