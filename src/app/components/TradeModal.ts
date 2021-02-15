import { Animal } from '~src/Animals/Animal';
import { AlertType } from '~src/Enums/AlertEnum';
import { CallbackNoParam } from '~src/Interfaces/CallbackInterface';
import { HerdConfigInterface } from '~src/Interfaces/HerdConfigInterface';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Player } from '../../Player';
import { Herd } from '../logic/Herd';
import { Offer, Trade } from '../Trade';
import { Render } from '../utils/Render';
import { Alert } from './Alert';
import { EmptyModal } from './EmptyModal';

export class TradeModal extends EmptyModal {
  private tradeForm: HTMLElement;
  private playerView: HTMLElement;
  private bankView: HTMLElement;
  private warning: HTMLElement;
  private backButton: HTMLElement;
  private player: Player;
  private header: HTMLElement;
  private tradeValues: HTMLElement;

  /**
   * @param trade instance of Trade
   * @param firstPlayer instance of player who will be first in queue
   */
  constructor(
    private trade: Trade,
    firstPlayer: Player,
    private animalConfig: HerdConfigInterface[],
    private backCallback: CallbackNoParam,
    private succesCallback: CallbackNoParam,
  ) {
    super();
    this.player = firstPlayer;
    this.playerView = Render.elementFactory('div', {
      className: 'trade__player-wrapper',
    });
    this.bankView = Render.elementFactory('div', {
      className: 'trade__player-wrapper',
    });
    this.tradeValues = Render.elementFactory('div', {
      clasName: 'trade__player-wrapper',
    });
    this.header = Render.elementFactory(
      'h2',
      { className: 'trade__heading' },
      'Pick the animals and the amount you want to exchange',
    );
    this.tradeForm = Render.elementFactory(
      'form',
      {
        action: '',
        method: 'post',
        className: 'trade',
      },
      this.playerView,
      Render.elementFactory(
        'button',
        {
          type: 'submit',
          className: 'trade__submit',
        },
        Render.elementFactory('img', {
          alt: 'exchange',
          src: './static/images/ui/exchange-dark.svg',
        }),
        Render.elementFactory('p', {}, 'Exchange'),
      ),
      this.bankView,
      ``,
      this.tradeValues,
    );
    this.warning = Render.elementFactory('p', {
      className: 'warning',
    });
    this.backButton = Render.elementFactory(
      'button',
      { className: 'trade__back' },
      '+',
    );
    Render.childrenInjector(
      this.modalContainer,
      this.header,
      this.warning,
      this.tradeForm,
      this.backButton,
    );
  }

  /**
   * Creates TradeModal and returns it as HTMLElement.
   */
  createModal(): HTMLElement {
    Render.childrenInjector(
      this.bankView,
      this.createHerdView(this.trade.thisBank, true),
    );
    Render.childrenInjector(
      this.playerView,
      this.createHerdView(this.player),
    );
    Render.childrenInjector(
      this.tradeValues,
      this.createTradeValuesView(),
    );
    this.tradeForm.addEventListener('submit', this.handleSubmit);
    this.modal.addEventListener('keydown', this.clearWarning);
    this.modal.addEventListener('click', this.clearWarning);
    this.backButton.addEventListener('click', () => {
      this.hideModal();
      this.backCallback();
    });
    return this.modal;
  }

  private createTradeValuesView(): HTMLElement {
    const herdElement = Render.elementFactory(
      'div',
      {
        className: 'trade__player-herd',
      },
      ...this.generateTradeValuesRows(),
    );
    const container = Render.elementFactory(
      'div',
      {
        className: 'trade__player',
      },
      Render.elementFactory(
        'H2',
        { className: 'trade__player-heading' },
        `Animals trade values:`,
      ),
      herdElement,
    );
    return container;
  }

  private generateTradeValuesRows(): HTMLElement[] {
    return this.animalConfig.map(({ name, path, tradeValue }) =>
      Render.elementFactory(
        'div',
        { className: 'trade__row--hints' },
        Render.elementFactory('img', {
          className: 'trade__player-herd--image',
          src: path,
          alt: name,
        }),
        Render.elementFactory(
          'p',
          { className: 'trade__player-herd--hints' },
          ` = ${tradeValue}`,
        ),
      ),
    );
  }

  /**
   * Sets next player and his herd in the TradeModal.
   */
  setNextPlayer(player: Player): void {
    this.player = player;
    Render.removeAllChildren(this.playerView);
    this.playerView.appendChild(this.createHerdView(this.player));
    this.updateBank();
    this.showModal();
  }

  private updateBank(): void {
    Render.removeAllChildren(this.bankView);
    this.bankView.appendChild(
      this.createHerdView(this.trade.thisBank, true),
    );
  }

  private createHerdView(
    { theHerd: herd, theName: name }: Player,
    isBank = false,
  ): HTMLElement {
    const herdElement = Render.elementFactory(
      'div',
      {
        className: 'trade__player-herd',
      },
      ...this.generateAnimalRows(herd, isBank),
    );
    const container = Render.elementFactory(
      'div',
      {
        className: 'trade__player',
      },
      Render.elementFactory(
        'H2',
        { className: 'trade__player-heading' },
        `${name}`,
      ),
      herdElement,
    );
    return container;
  }

  private generateAnimalRows(
    herd: Herd,
    isBank: boolean,
  ): HTMLElement[] {
    const animalsRows: HTMLElement[] = herd.theAnimals.reduce(
      (animalsElements: HTMLElement[], [animal, count]) => {
        if (count > 0) {
          animalsElements.push(
            Render.elementFactory(
              'div',
              { className: 'trade__row' },
              Render.elementFactory('img', {
                name: `${isBank ? 'bank' : 'player'}_${
                  animal.theName
                }`,
                src: animal.theImagePath,
                alt: animal.theName,
                className: 'trade__player-herd--image',
              }),
              Render.elementFactory(
                'p',
                { className: 'trade__player-herd--count' },
                `x ${count}`,
              ),
              this.createInputBox(isBank, animal, count),
              Render.elementFactory(
                'div',
                { className: 'trade__player-herd--buttons' },
                ...this.createButtons(
                  isBank,
                  animal.theName.replace(' ', '_'),
                  count,
                ),
              ),
            ),
          );
        }
        return animalsElements;
      },
      [],
    );

    return animalsRows;
  }

  private createInputBox(
    isBank: boolean,
    animal: Animal,
    count: number,
  ): HTMLElement {
    const input = Render.elementFactory('input', {
      type: 'text',
      id: `${isBank ? 'bank' : 'player'}_${animal.theName.replace(
        ' ',
        '_',
      )}`,
      name: `${isBank ? 'bank' : 'player'}_${animal.theName}`,
      className: 'trade__player-herd--input',
      value: '0',
      pattern: '\\d+',
    }) as HTMLInputElement;
    input.addEventListener('change', () => {
      const value = parseInt(input.value);
      if (value > count) {
        input.value = `${count}`;
      }
    });
    return input;
  }

  private createButtons(
    isBank: boolean,
    animal: string,
    count: number,
  ): HTMLElement[] {
    const buttons: HTMLElement[] = [];
    buttons.push(this.createSingleButton(1, isBank, animal, count));
    buttons.push(this.createSingleButton(5, isBank, animal, count));
    buttons.push(this.createSingleButton(-1, isBank, animal, count));
    buttons.push(this.createSingleButton(-5, isBank, animal, count));
    return buttons;
  }

  private createSingleButton(
    value: number,
    isBank: boolean,
    animal: string,
    count: number,
  ): HTMLElement {
    const button = Render.elementFactory(
      'button',
      {
        type: 'button',
        className: 'trade__player-herd--button',
      },
      `${value < 0 ? value : '+' + value}`,
    );
    button.addEventListener('click', () =>
      this.changeValue(value, isBank, animal, count),
    );
    return button;
  }

  private changeValue(
    value: number,
    isBank: boolean,
    animal: string,
    count: number,
  ): void {
    const input = document.querySelector(
      `#${isBank ? 'bank' : 'player'}_${animal}`,
    ) as HTMLInputElement;
    const inputValue = parseInt(input.value);
    if (value < 0) {
      if (inputValue > 0 && inputValue >= Math.abs(value)) {
        input.value = `${inputValue + value}`;
      }
    } else {
      const newValue = inputValue + value;
      if (newValue <= count) {
        input.value = `${value + inputValue}`;
      }
    }
  }

  private formDataIntoTuples(formData: FormData): [Offer[], Offer[]] {
    const offer: Offer[] = [];
    const target: Offer[] = [];
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      const numberOfAnimals = parseInt(value.toString());
      const [player, animal] = key.split('_');
      if (numberOfAnimals > 0) {
        switch (player) {
          case 'player': {
            offer.push([animal as AnimalNames, numberOfAnimals]);
            break;
          }
          case 'bank': {
            target.push([animal as AnimalNames, numberOfAnimals]);
            break;
          }
        }
      }
    }
    return [offer, target];
  }

  private processTrade([offer, target]: [Offer[], Offer[]]): boolean {
    if (offer.length <= 0 || target.length <= 0) {
      this.displayWarning(
        'There need to be at least one animal on both sides',
      );
      return false;
    }
    const [[offeredAnimal]] = offer;
    const [[targetAnimal]] = target;
    if (this.trade.processOffer(offer, this.player, target)) {
      return true;
    }
    this.displayWarning(
      `The value ratio of the ${offeredAnimal}s to ${targetAnimal}s is not correct`,
    );
    return false;
  }

  private displayWarning(message: string): void {
    this.warning.textContent = message;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = this.formDataIntoTuples(formData);
    if (this.processTrade(data)) {
      Alert.updateAlert(
        `${this.player.theName} exchanged ${data[0]
          .map(
            ([animal, count]) =>
              count + ' ' + animal + (count > 1 ? 's' : ''),
          )
          .join(' and ')} for ${data[1]
          .map(
            ([animal, count]) =>
              count + ' ' + animal + (count > 1 ? 's' : ''),
          )
          .join(' and ')}.`,
        AlertType.INFO,
      );
      this.hideModal();
      this.succesCallback();
    }
  };

  private clearWarning = (): void => {
    this.warning.textContent = '';
  };
}
