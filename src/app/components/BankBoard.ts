import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
import { flatten } from 'lodash';
export class BankBoard {
  /* returns Bank board with animals and counts */
  renderBankBoard(bank: Bank): HTMLElement {
    const bankView: HTMLElement = Render.elementFactory('div', {
      className: 'bank',
    });
    const bankHerd = bank.theHerd.theAnimals.map(
      ([animal, count]) => [animal.theImagePath, count],
    );
    const bankImagesAndCounts: HTMLElement[][] = bankHerd.map(
      ([pathElement, countElement]) => {
        const animalImg: HTMLElement = Render.elementFactory('img', {
          className: 'bank__img',
          src: `${pathElement}`,
        });
        const animalCount: HTMLElement = Render.elementFactory(
          'div',
          { className: 'bank__count' },
          `x${countElement}`,
        );

        return [animalImg, animalCount];
      },
    );

    Render.childrenInjector(
      bankView,
      ...flatten(bankImagesAndCounts),
    );
    return bankView;
  }
}
