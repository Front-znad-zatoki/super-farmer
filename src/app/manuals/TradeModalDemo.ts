import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { Player } from '~src/Player';
import { TradeModal } from '../components/TradeModal';
import { Bank } from '../logic/Bank';
import { Trade } from '../Trade';
import { Render } from '../utils/Render';

export class TradeModalDemo {
  static playDemo(): void {
    const trade = new Trade(new Bank());
    const player = new Player(
      'player',
      './static/images/avatars/dog.png',
    );
    player.theHerd.addAnimalsToHerd(AnimalNames.RABBIT, 20);
    player.theHerd.addAnimalsToHerd(AnimalNames.SHEEP, 5);
    player.theHerd.addAnimalsToHerd(AnimalNames.PIG, 5);
    player.theHerd.addAnimalsToHerd(AnimalNames.COW, 2);
    player.theHerd.addAnimalsToHerd(AnimalNames.HORSE, 1);
    const modal = new TradeModal(trade, player);
    Render.render('#sf-app', modal.createModal());
    modal.setPlayer(player);
  }
}
