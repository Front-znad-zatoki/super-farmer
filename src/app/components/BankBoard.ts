import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
import { ConvertAnimalName } from '../utils/ConvertAnimalName';
export class BankBoard {
  /* returns Bank board with animals and counts */
  renderBankBoard(bank: Bank): HTMLElement {
    const bankView = Render.elementFactory('div', {
      className: 'bank__board',
    });
    const bankText = Render.elementFactory(
      'div',
      { className: 'bank__board__text' },
      `BANK:`,
    );
    const bankHerd = bank.theHerd.theAnimals.map(([animal, count]) =>
      Render.elementFactory(
        'div',
        { className: 'bank__board__container' },
        ConvertAnimalName.toHTMLElement(
          animal.theName,
          'bank__board__img',
        ),
        `x${count}`,
      ),
    );

    Render.childrenInjector(bankView, bankText, ...bankHerd);
    return bankView;
  }
}
