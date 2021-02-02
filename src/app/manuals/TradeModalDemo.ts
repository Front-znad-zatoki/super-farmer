import { Player } from '~src/Player';
import { TradeModal } from '../components/TradeModal';
import { Bank } from '../logic/Bank';
import { Trade } from '../Trade';
import { Render } from '../utils/Render';

export class TradeModalDemo {
  static playDemo(): void {
    const trade = new Trade(new Bank());
    const modal = new TradeModal(trade);
    const player = new Player(
      'player',
      './static/images/avatars/dog.png',
    );
    Render.render('#sf-app', modal.createModal());
  }
}
