import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { View } from '../View';
import { TradeModal } from '../components/TradeModal';
import { flatten } from 'lodash';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';

export class PlayerPanel {
  private tradeModal: TradeModal;
  /**
   * Creates PlayerPanel based on data given
   * @param player accepts instance of current player
   * @param view accepts instance of View componnet
   */
  constructor(private player: Player, private view: View) {
    this.tradeModal = new TradeModal();
  }

  createPlayerPanel(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'player-panel' },
      this.createPlayerBoard(),
      this.createResultWindow(),
      this.createButtonPanel(),
    );
  }

  private createPlayerBoard(): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'player-panel__board',
      },
      Render.elementFactory(
        'div',
        {},
        `Current player: ${this.player.theName}`,
        Render.elementFactory('img', {
          src: this.player.theAvatar,
          alt: `${this.player.theName}-avatar`,
        }),
      ),
      Render.elementFactory(
        'div',
        {},
        `Time left: ${this.player.theAvatar}`,
      ),
      this.createPlayerHerd(),
    );
  }

  private createPlayerHerd(): HTMLElement {
    return Render.elementFactory(
      'div',
      {},
      ...flatten(this.convertHerd()),
    );
  }

  private convertHerd(): HTMLElement[] {
    return this.player.theHerd.theAnimals.map(([animal, count]) => {
      return Render.elementFactory(
        'div',
        { className: 'resources' },
        Render.elementFactory('img', {
          className: 'player-panel__image',
          alt: `${animal.theName}`,
          src: `./static/images/avatars/${
            animal.theName === AnimalNames.BIG_DOG ||
            animal.theName === AnimalNames.SMALL_DOG
              ? 'dog'
              : animal.theName
          }.png`,
        }),
        `x${count}`,
      );
    });
  }

  private createResultWindow(): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'player-panel__result',
      },
      'Results:',
    );
  }

  private createButtonPanel(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'player-panel__buttons' },
      this.createDiceButton(),
      this.createExchangeButton(),
    );
  }

  private createDiceButton(): HTMLElement {
    const rollBtn = Render.elementFactory(
      'button',
      {},
      'Roll a dice',
    );
    rollBtn.addEventListener('click', () => this.view.handleRoll());
    return rollBtn;
  }

  private createExchangeButton(): HTMLElement {
    const exchangeBtn = Render.elementFactory(
      'button',
      {},
      'Exchange',
    );
    exchangeBtn.addEventListener('click', () =>
      this.tradeModal.display(),
    );
    return exchangeBtn;
  }
}
