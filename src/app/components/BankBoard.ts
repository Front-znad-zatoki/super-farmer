import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
export class BankBoard {
  private bankView: HTMLElement;
  constructor(private bank: Bank) {
    this.bankView = Render.elementFactory('div', {
      className: 'bank',
    });
    this.renderBankBoard();
  }

  /* returns Bank board with animals and counts */
  private renderBankBoard(): void {
    Render.removeAllChildren(this.bankView);
    const bankTitle = Render.elementFactory(
      'p',
      {
        className: 'bank__title',
      },
      'Bank',
    );
    const bankHerd = this.bank.theHerd.theAnimals.map(
      ([animal, count]) =>
        Render.elementFactory(
          'div',
          { className: 'bank__item' },
          Render.elementFactory('img', {
            className: 'bank__img',
            alt: animal.theName.toLowerCase(),
            src: `${animal.theImagePath}`,
            style: `${
              animal.theName === 'small dog'
                ? 'height: 2rem; width: auto; margin: .5rem;'
                : ''
            }`,
          }),
          Render.elementFactory(
            'p',
            { className: 'bank__count' },
            `${count}`,
          ),
        ),
    );

    Render.childrenInjector(this.bankView, bankTitle, ...bankHerd);
  }

  get theBankView(): HTMLElement {
    return this.bankView;
  }

  updateBank(): void {
    this.renderBankBoard();
  }
}
