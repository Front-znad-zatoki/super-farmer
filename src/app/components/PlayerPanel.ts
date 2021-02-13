import { Player } from '../../Player';
import { Render } from '../utils/Render';
// import { flatten } from 'lodash';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { GameView } from '../GameView';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';
import { Animal } from '../../Animals/Animal';

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
        style: `background-color: ${player.theColor};`,
      },
      this.createResultWindow(),
      this.createButtonPanel(),
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
      {
        id: 'roll-dice',
        className: 'btn button',
      },
      'Roll the dice',
    );
    rollBtn.addEventListener('click', () => {
      this.view.handleRoll();
      (document.querySelector(
        '#roll-dice',
      ) as HTMLElement).setAttribute('disabled', 'true');
    });
    return rollBtn;
  }

  private createExchangeButton(): HTMLElement {
    const tradeBtn = Render.elementFactory(
      'button',
      {
        id: 'exchange',
        className: 'btn button',
      },
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
    player: Player,
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
          `${player.theName} gains:`,
        ),
        ...this.convertAnimalsToHTML(
          playerGain.map(([animal, count]) => [
            ConvertAnimalName.toAnimalObject(animal),
            count,
          ]),
        ),
      ),
    );
    this.view.stopTimer();
    // setTimeout(() => this.hideTimer(), 10);
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
