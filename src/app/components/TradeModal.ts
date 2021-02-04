import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { Player } from '~src/Player';
import { Herd } from '../logic/Herd';
import { Offer, Trade } from '../Trade';
import { Render } from '../utils/Render';
import { EmptyModal } from './EmptyModal';

export class TradeModal extends EmptyModal {
  tradeForm: HTMLElement;
  playerView: HTMLElement;
  bankView: HTMLElement;
  player: Player;

  constructor(private trade: Trade, firstPlayer: Player) {
    super();
    this.player = firstPlayer;
    this.playerView = Render.elementFactory('div', {
      className: 'trade__player-wrapper',
    });
    this.bankView = Render.elementFactory('div', {
      className: 'trade__player-wrapper',
    });
    this.tradeForm = Render.elementFactory(
      'form',
      {
        action: '',
        method: 'get',
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
    this.modalContainer.appendChild(this.tradeForm);
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
    return this.modal;
  }

  /**
   * Sets next player and his herd in the TradeModal.
   */
  setNextPlayer(player: Player): void {
    this.player = player;
    Render.removeAllChildren(this.playerView);
    this.playerView.appendChild(this.createHerdView(this.player));
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
              Render.elementFactory(
                'label',
                {
                  for: `${isBank ? 'bank' : 'player'}_${
                    animal.theName
                  }`,
                },
                `${animal.theName}: ${count}`,
              ),
              Render.elementFactory('input', {
                type: 'number',
                id: `${isBank ? 'bank' : 'player'}_${animal.theName}`,
                name: `${isBank ? 'bank' : 'player'}_${
                  animal.theName
                }`,
                min: '0',
                max: `${count}`,
              }),
            ),
          );
        }
        return animalsElements;
      },
      [],
    );

    return animalsRows;
  }

  //TODO: refactor
  private formDataIntoTuples(formData: FormData): [Offer, Offer] {
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

    //TODO: add display warning when more or less than needed
    if (offer.length !== 1 || target.length !== 1) {
      console.log('Za dużo zwiemrzątek');
    }
    return [offer[0], target[0]];
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const [offer, target] = this.formDataIntoTuples(formData);
    if (this.trade.processOffer(offer, this.player, target)) {
      this.setNextPlayer(this.player);
    }
  };
}
