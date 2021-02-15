import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameView } from '../GameView';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';

export class PlayerPanel {
  /**
   * Creates PlayerPanel based on data given
   * @param view accepts instance of View componenet
   */
  constructor(private view: GameView) {}
  /**
   * Creates player panel and returns it as HTMLElement
   */
  createPlayerPanel(player: Player): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'player-panel',
      },
      this.createResultTitle(),
      this.createResultWindow(),
      this.createExchangeButton(),
      this.createDiceButton(),
    );
  }

  private createResultTitle(): HTMLElement {
    return Render.elementFactory(
      'p',
      { className: 'player-panel__title' },
      'Results',
    );
  }
  private createResultWindow(): HTMLElement {
    return Render.elementFactory('div', {
      className: 'player-panel__result',
    });
  }
  private createExchangeButton(): HTMLElement {
    const tradeBtn = Render.elementFactory(
      'button',
      {
        id: 'exchange',
        className: 'button button__trade',
      },
      Render.elementFactory('img', {
        className: 'button__trade__img',
        src: 'static/images/ui/vector.png',
      }),
      Render.elementFactory(
        'div',
        { className: 'button__trade__text' },
        Render.elementFactory(
          'p',
          { className: 'button__trade__text--big' },
          'Exchange',
        ),
        Render.elementFactory(
          'p',
          { className: 'button__trade__text--small' },
          'animals',
        ),
      ),
    );
    tradeBtn.addEventListener('click', () => this.view.handleTrade());
    return tradeBtn;
  }
  private createDiceButton(): HTMLElement {
    const rollBtn = Render.elementFactory(
      'button',
      {
        id: 'roll-dice',
        className: 'button button__dice',
      },
      Render.elementFactory('span', {
        className: 'button__dice__img fas fa-dice',
      }),
      Render.elementFactory(
        'div',
        { className: 'button__dice__text' },
        Render.elementFactory(
          'p',
          { className: 'button__dice__text--big' },
          'Roll',
        ),
        Render.elementFactory(
          'p',
          { className: 'button__dice__text--small' },
          'the dice',
        ),
      ),
    );
    rollBtn.addEventListener('click', () => {
      this.view.handleRoll();
      (document.querySelector(
        '#roll-dice',
      ) as HTMLElement).setAttribute('disabled', 'true');
    });
    return rollBtn;
  }

  /**
   * Displays results of Dice throw
   * @param diceResults Takes array of dice results
   */
  displayRollResult(diceResults: AnimalNames[]): void {
    const diceResult = Render.elementFactory(
      'div',
      {},
      ...diceResults.map((name) =>
        ConvertAnimalName.toHTMLElement(name, 'player-panel__image'),
      ),
    );
    Render.render('.player-panel__result', diceResult);
    this.view.stopTimer();
  }
  disableTrade(): void {
    (document.querySelector('#exchange') as HTMLElement).setAttribute(
      'disabled',
      'true',
    );
  }

  disableRoll(): void {
    (document.querySelector(
      '#roll-dice',
    ) as HTMLElement).setAttribute('disabled', 'true');
  }
}
