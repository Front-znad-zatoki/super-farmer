import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';
export class BankBoard {
  /* returns Bank board with animals and counts */
  renderBankBoard(bank: Bank): HTMLElement {
    const bankView = Render.elementFactory('div', {
      className: 'bank',
    });
    const bankHerd = bank.theHerd.theAnimals.map(([animal, count]) =>
      Render.elementFactory(
        'div',
        { className: 'bank__item' },
        Render.elementFactory('img', {
          className: 'bank__img',
          alt: animal.theName.toLowerCase(),
          src: `${animal.theImagePath}`,
        }),
        Render.elementFactory(
          'p',
          { className: 'bank__count' },
          `${count}`,
        ),
      ),
    );

    Render.childrenInjector(bankView, ...bankHerd);
    return bankView;
  }
}
