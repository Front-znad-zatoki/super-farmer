import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Player } from '../../Player';
import { Bank } from '../logic/Bank';
import { Trade } from '../Trade';

// To run this demo add TradeDemo.playDemo() in App.ts

export class TradeDemo {
  static playDemo(): void {
    const bank = new Bank();
    const trade = new Trade(bank);
    const player = new Player('player');
    player.theHerd.addAnimals(AnimalNames.SHEEP, 5);
    player.theHerd.addAnimals(AnimalNames.PIG, 5);
    player.theHerd.addAnimals(AnimalNames.COW, 2);
    const offer1: [AnimalNames, number] = [AnimalNames.SHEEP, 1];
    const offer2: [AnimalNames, number] = [AnimalNames.SHEEP, 2];
    const offer3: [AnimalNames, number] = [AnimalNames.COW, 1];
    const offer4: [AnimalNames, number] = [AnimalNames.COW, 2];
    const offer5: [AnimalNames, number] = [AnimalNames.PIG, 2];
    const target1: [AnimalNames, number] = [AnimalNames.RABBIT, 6];
    const target2: [AnimalNames, number] = [AnimalNames.RABBIT, 7];
    const target3: [AnimalNames, number] = [AnimalNames.RABBIT, 5];
    const target4: [AnimalNames, number] = [AnimalNames.HORSE, 1];
    const target5: [AnimalNames, number] = [AnimalNames.RABBIT, 12];

    console.log(
      `OFFER: ${offer1}; TARGET: ${target1}; SUCCES: ${trade.processOffer(
        offer1,
        player,
        target1,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer1}; TARGET: ${target2}; SUCCES: ${trade.processOffer(
        offer1,
        player,
        target2,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer1}; TARGET: ${target3}; SUCCES: ${trade.processOffer(
        offer1,
        player,
        target3,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer2}; TARGET: ${target1}; SUCCES: ${trade.processOffer(
        offer2,
        player,
        target1,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer3}; TARGET: ${target4}; SUCCES: ${trade.processOffer(
        offer3,
        player,
        target4,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer4}; TARGET: ${target4}; SUCCES: ${trade.processOffer(
        offer4,
        player,
        target4,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
    console.log(
      `OFFER: ${offer5}; TARGET: ${target5}; SUCCES: ${trade.processOffer(
        offer5,
        player,
        target5,
      )}; PLAYER_HERD: ${JSON.stringify(
        player.theHerd,
      )}; BANK_HERD: ${JSON.stringify(bank.theHerd)};`,
    );
  }
}
