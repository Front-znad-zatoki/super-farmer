import { CallbackNoParam } from '~src/Interfaces/CallbackInterface';
import { EmptyView } from '../EmptyView';
import { Render } from '../utils/Render';

export class RulesModal extends EmptyView {
  private backCallback: CallbackNoParam;
  constructor(backCallback: CallbackNoParam) {
    super();
    this.backCallback = backCallback;
    const heading = Render.elementFactory(
      'h2',
      { className: 'modal__heading' },
      'Game Rules',
    );

    const text = Render.elementFactory(
      'div',
      {
        className: 'modal__text--rules rules',
      },
      'Game is split into rounds. A single round consists of each players turn, which is divided into two phases. First phase is a trading phase, in which a player can make one exchange with the bank. Exchange is restricted to global rules. Second phase is a breeding phase, in which the player throws two different, 12 edge dice and is able to breed animals, that have been shown on the dice. For each pair of the same animals on the dice, or a single animal from the dice which could pair with one from your herd, a player receives a new animal of this kind from bank. However, if dice will show fox, a player has to discard all the rabbits from his herd, and if it will show wolf, all animals are discarded except for the horse. These losses can be prevented, if a player has a dog in the herd. Small dogs prevent from fox effect, big dogs prevent from wolf effect. In dynamic mode there is small change. Fox will kill all rabbits except one and wolf will kill all animals except horses, rabbits and small dog.',
    );
    const button = Render.elementFactory(
      'button',
      { type: 'button', className: 'button--start button--nav' },
      'BACK TO MENU',
    );
    button.addEventListener('click', () => {
      this.hide();
      this.backCallback();
    });
    Render.childrenInjector(this.view, heading, text, button);
  }

  get theRulesView(): HTMLElement {
    return this.view;
  }
}
