import { Render } from '../utils/Render';
import { Bank } from '../logic/Bank';
import { flatten } from 'lodash';
export class BankBoard {
  renderBankBoard(): void {
    const bank = new Bank();
    const bankView: HTMLElement = Render.elementFactory('div', {
      className: 'bank',
    });
    const bankHerd = bank.theHerd.theAnimals.map(
      ([animal, count]) => [animal.theName, count],
    );
    const bankImagesAndCounts: HTMLElement[][] = bankHerd.map(
      ([nameElement, countElement]) => {
        if (
          nameElement === 'big dog' ||
          nameElement === 'small dog'
        ) {
          const animalImg: HTMLElement = Render.elementFactory(
            'img',
            {
              className: 'bank__herd__img',
              src: `../../../static/images/avatars/dog.png`,
            },
          );

          console.log(animalImg, countElement);
          const animalCount: HTMLElement = Render.elementFactory(
            'div',
            { className: 'bank__herd__count' },
            `x${countElement}`,
          );

          return [animalImg, animalCount];
        }
        const animalImg: HTMLElement = Render.elementFactory('img', {
          className: 'bank__herd__img',
          src: `../../../static/images/avatars/${nameElement}.png`,
        });
        const animalCount: HTMLElement = Render.elementFactory(
          'div',
          { className: 'bank__herd__count' },
          `x${countElement}`,
        );
        return [animalImg, animalCount];
      },
    );

    Render.childrenInjector(
      bankView,
      ...flatten(bankImagesAndCounts),
    );
    Render.render('#sf-app', bankView);
  }
}
