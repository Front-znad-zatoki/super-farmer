import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { flatten } from 'lodash';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameView } from '../GameView';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';
import { Animal } from '../../Animals/Animal';

export class PlayerPanel {
  /**
   * Creates PlayerPanel based on data given
   * @param player accepts instance of current player
   * @param view accepts instance of View componenet
   */
  constructor(private player: Player, private view: GameView) {}

  /**
   * Creates player panel and returns it as HTMLElement
   */
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
      ...flatten(
        this.convertAnimalsToHTML(this.player.theHerd.theAnimals),
      ),
    );
  }

  private convertAnimalsToHTML(
    animals: [Animal, number][],
  ): HTMLElement[] {
    return animals.map(([animal, count]) =>
      Render.elementFactory(
        'div',
        { className: 'player-panel__result--container' },
        ConvertAnimalName.toHTMLElement(
          animal.theName,
          'player-panel__image',
        ),
        `x${count}`,
      ),
    );
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
      { className: 'btn button' },
      'Roll the dice',
    );
    // rollBtn.addEventListener('click', () => this.view.handleRoll());
    rollBtn.addEventListener('click', () => this.view.handleRoll());
    return rollBtn;
  }

  private createExchangeButton(): HTMLElement {
    const tradeBtn = Render.elementFactory(
      'button',
      { className: 'btn button' },
      'Exchange',
    );
    tradeBtn.addEventListener('click', () => this.view.handleTrade());
    return tradeBtn;
  }

  /**
   * Displays results of Dice throw
   * @param diceResults Takes array of dice results
   * @param playerGain Takes array of tuples containing players gain
   */
  displayRollResult(
    diceResults: AnimalNames[],
    playerGain: [AnimalNames, number][],
  ): void {
    const diceResult = Render.elementFactory(
      'div',
      {},
      Render.elementFactory(
        'h3',
        { className: 'player-panel__result--dice' },
        `Dice results:`,
      ),
      ...diceResults.map((name) =>
        ConvertAnimalName.toHTMLElement(name, 'player-panel__image'),
      ),
    );
    Render.render(
      '.player-panel__result',
      diceResult,
      Render.elementFactory(
        'div',
        {},
        Render.elementFactory(
          'h3',
          { className: 'player-panel__result--gain' },
          `${this.player.theName} gains:`,
        ),
        ...this.convertAnimalsToHTML(
          playerGain.map(([animal, count]) => [
            ConvertAnimalName.toAnimalObject(animal),
            count,
          ]),
        ),
      ),
    );
  }

  /**
   * Updates timer on player panel
   * @param timeLeft accepts number value for time left
   */
  updateTime(timeLeft: number): void {
    const timer = document.querySelector('#time-left') as HTMLElement;
    timer.innerText = `Time left: ${timeLeft} sec.`;
    timer.setAttribute('disabled', 'false');
  }

  /**
   * Hides timer if necessary
   */
  hideTimer(): void {
    (document.querySelector(
      '#time-left',
    ) as HTMLElement).setAttribute('disabled', 'true');
  }
}
