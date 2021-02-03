import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { flatten } from 'lodash';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameView } from '../GameView';
import { time } from 'console';

export class PlayerPanel {
  /**
   * Creates PlayerPanel based on data given
   * @param player accepts instance of current player
   * @param view accepts instance of View componenet
   */
  constructor(private player: Player, private view: GameView) {}

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
        `Time left: `,
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
      'Roll the dice',
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

  displayRollResult(
    diceResults: [AnimalNames, AnimalNames],
    playerGain: [AnimalNames, number][],
  ): void {
    const diceResult = Render.elementFactory(
      'div',
      {},
      Render.elementFactory('img', {
        className: 'player-panel__image',
        alt: `${diceResults[0].toLowerCase()}`,
        src: `./static/images/avatars/${diceResults[0].toLowerCase()}.png`,
      }),
      Render.elementFactory('img', {
        className: 'player-panel__image',
        alt: `${diceResults[1].toLowerCase()}`,
        src: `./static/images/avatars/${diceResults[1].toLowerCase()}.png`,
      }),
    );
    const gain = playerGain.map(([name, count]) =>
      Render.elementFactory(
        'img',
        {
          className: 'player-panel__image',
          src: `./static/images/avatars/${name.toLowerCase()}.png`,
          alt: `${name.toLowerCase()}`,
        },
        `x${count}`,
      ),
    );
    Render.render(
      '.player-panel__result',
      diceResult,
      Render.elementFactory('div', {}, ...gain),
    );
  }

  updateTime(timeLeft: number): void {
    const timer = document.querySelector('#time-left') as HTMLElement;
    timer.innerText = `Time left: ${timeLeft} sec.`;
    timer.setAttribute('disabled', 'false');
  }

  hideTimer(): void {
    (document.querySelector(
      '#time-left',
    ) as HTMLElement).setAttribute('disabled', 'true');
  }
}
