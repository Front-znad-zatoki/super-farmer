import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
export class BankBoard {
  /* returns Bank board with animals and counts */
  renderBankBoard(bank: Bank): HTMLElement {
    const bankView = Render.elementFactory('div', {
      className: 'bank',
    });
    const bankTitle = Render.elementFactory(
      'p',
      {
        className: 'bank__title',
      },
      'Bank',
    );
    const bankHerd = bank.theHerd.theAnimals.map(([animal, count]) =>
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

    Render.childrenInjector(bankView, bankTitle, ...bankHerd);
    return bankView;
  }
}
