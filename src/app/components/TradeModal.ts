import { CallbackNoParam } from '~src/Interfaces/CallbackInterface';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Player } from '../../Player';
import { Herd } from '../logic/Herd';
import { Offer, Trade } from '../Trade';
import { Render } from '../utils/Render';
import { EmptyModal } from './EmptyModal';

export class TradeModal extends EmptyModal {
  private tradeForm: HTMLElement;
  private playerView: HTMLElement;
  private bankView: HTMLElement;
  private warning: HTMLElement;
  private backButton: HTMLElement;
  private player: Player;
  private header: HTMLElement;

  /**
   * @param trade instance of Trade
   * @param firstPlayer instance of player who will be first in queue
   */
  constructor(
    private trade: Trade,
    firstPlayer: Player,
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
      Render.elementFactory('input', {
        type: 'submit',
        value: 'Trade',
        className: 'trade__submit',
      }),
      this.bankView,
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
      this.tradeForm,
      this.warning,
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
    this.tradeForm.addEventListener('submit', this.handleSubmit);
    this.modal.addEventListener('keydown', this.clearWarning);
    this.modal.addEventListener('click', this.clearWarning);
    this.backButton.addEventListener('click', () => {
      this.hideModal();
      this.backCallback();
    });
    return this.modal;
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
              Render.elementFactory('input', {
                type: 'text',
                id: `${
                  isBank ? 'bank' : 'player'
                }_${animal.theName.replace(' ', '_')}`,
                name: `${isBank ? 'bank' : 'player'}_${
                  animal.theName
                }`,
                className: 'trade__player-herd--input',
                value: '0',
                disabled: 'true',
              }),
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
      this.hideModal();
      this.succesCallback();
    }
  };

  private clearWarning = (): void => {
    this.warning.textContent = '';
  };
}
