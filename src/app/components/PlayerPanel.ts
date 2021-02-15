import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameView } from '../GameView';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';
// import { Animal } from '../../Animals/Animal';

export class PlayerPanel {
  /**
   * Creates PlayerPanel based on data given
   * @param view accepts instance of View componenet
   */
  constructor(private view: GameView) {}
  /**
   * Creates player panel and returns it as HTMLElement
   */
  createPlayerPanel(currentPlayer: Player): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'player-panel',
      },
      this.createResultTitle(),
      this.createResultWindow(),
      this.createExchangeButton(currentPlayer),
      this.createDiceButton(currentPlayer),
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
  private createExchangeButton(player: Player): HTMLElement {
    const tradeBtn = Render.elementFactory(
      'button',
      {
        id: 'exchange',
        className: 'btn button',
        style: `border:1px solid ${player.theColor}`,
      },
      Render.elementFactory('img', {
        className: 'btn__img',
        src: 'static/images/ui/vector.png',
      }),
      Render.elementFactory(
        'div',
        { className: 'btn__text' },
        Render.elementFactory(
          'p',
          { className: 'btn__text--big' },
          'Exchange',
        ),
        Render.elementFactory(
          'p',
          { className: 'btn__text--small' },
          'animals',
        ),
      ),
    );
    tradeBtn.addEventListener('click', () => this.view.handleTrade());
    return tradeBtn;
  }
  private createDiceButton(player: Player): HTMLElement {
    const rollBtn = Render.elementFactory(
      'button',
      {
        id: 'roll-dice',
        className: 'btn button',
        style: `border:1px solid ${player.theColor}`,
      },
      Render.elementFactory('span', {
        className: 'btn__img fas fa-dice',
      }),
      Render.elementFactory(
        'div',
        { className: 'btn__text' },
        Render.elementFactory(
          'p',
          { className: 'btn__text--big' },
          'Roll',
        ),
        Render.elementFactory(
          'p',
          { className: 'btn__text--small' },
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
    // setTimeout(() => this.hideTimer(), 10);
  }

  // private hideTimer(): void {
  // (document.querySelector(
  // '#time-left',
  // ) as HTMLElement).style.display = 'none';
  // }

  turnAlert(player: Player): void {
    Render.render(
      '#sf-app',
      Render.elementFactory(
        'div',
        { className: 'exclamation' },
        `${player.theName}'s turn has passed!`,
      ),
    );
  }

  disableTrade(): void {
    (document.querySelector('#exchange') as HTMLElement).setAttribute(
      'disabled',
      'true',
    );
  }
}
