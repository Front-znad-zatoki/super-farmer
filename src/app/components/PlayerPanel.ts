import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { View } from '../View';
import { flatten } from 'lodash';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';

export class PlayerPanel {
  /**
   * Creates PlayerPanel based on data given
   * @param player accepts instance of current player
   * @param view accepts instance of View componnet
   */
  constructor(private player: Player, private view: View) {}

  createPlayerPanel(): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'player-panel',
        style: `background-color: ${this.player.theColor};`,
      },
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
        { className: 'player-panel__info' },
        Render.elementFactory('img', {
          src: this.player.theAvatar,
          alt: `${this.player.theName}-avatar`,
          className: 'avatar-icon',
        }),
        this.createPlayerDetails(),
      ),
      Render.elementFactory(
        'div',
        { id: 'time-left', className: 'player-panel__time' },
        `Time left: ${this.player.theAvatar}`,
      ),
      this.createPlayerHerd(),
    );
  }

  private createPlayerDetails(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'player-panel__details' },
      Render.elementFactory('p', {}, 'Current player:'),
      Render.elementFactory(
        'p',
        { className: 'player-panel__name' },
        `${this.player.theName}`,
      ),
    );
  }

  private createPlayerHerd(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'player-panel__herd' },
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
      { className: 'btn' },
      'Roll a dice',
    );
    rollBtn.addEventListener('click', () => this.view.handleRoll());
    return rollBtn;
  }

  private createExchangeButton(): HTMLElement {
    const tradeBtn = Render.elementFactory(
      'button',
      { className: 'btn' },
      'Exchange',
    );
    tradeBtn.addEventListener('click', () => this.view.handleTrade());
    return tradeBtn;
  }
}
