import { Player } from '~src/Player';
import { Herd } from '../logic/Herd';
import { Trade } from '../Trade';
import { Render } from '../utils/Render';
import { EmptyModal } from './EmptyModal';

export class TradeModal extends EmptyModal {
  tradeWrapper: HTMLElement;
  playerView: HTMLElement;
  bankView: HTMLElement;
  constructor(private trade: Trade) {
    super();
    this.playerView = Render.elementFactory('div', {
      className: 'trade-player__herd',
    });
    this.bankView = Render.elementFactory('div', {
      className: 'trade-player__herd',
    });
    this.tradeWrapper = Render.elementFactory(
      'div',
      {
        className: 'trade__wrapper',
      },
      this.playerView,
      this.bankView,
    );
  }

  createModal(): HTMLElement {
    Render.childrenInjector(
      this.modalContainer,
      this.createHerdView(new Player('Johny')),
    );
    return this.modal;
  }

  createHerdView(player: Player): HTMLElement {
    const herd = Render.elementFactory(
      'div',
      {
        className: 'trade-player__herd',
      },
      ...this.generateAnimalRows(player.theHerd),
    );
    const container = Render.elementFactory(
      'div',
      {
        className: 'trade-player',
      },
      Render.elementFactory(
        'H2',
        { className: 'trade-player__header' },
        `${player.theName}`,
      ),
      herd,
    );
    return container;
  }

  private generateAnimalRows(herd: Herd): HTMLElement[] {
    const animalsRows: HTMLElement[] = herd.theAnimals.reduce(
      (animalsElements: HTMLElement[], [animal, count]) => {
        animalsElements.push(
          Render.elementFactory(
            'p',
            {},
            `${animal.theName}: ${count}`,
          ),
        );
        return animalsElements;
      },
      [],
    );
    return animalsRows;
  }
}
