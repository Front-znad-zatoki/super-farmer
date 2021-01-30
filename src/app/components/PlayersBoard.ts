import { Render } from '../utils/Render';
import { flatten } from 'lodash';
import { Herd } from '.././logic/Herd';

export class PlayersBoard {
  /* returns player's board with player's name, avatar and herd */
  renderPlayersBoard(
    playersChosenAvatarPath: string,
    playersChosenName: string,
    playersColor: string,
  ): void {
    const playersBoardContainer: HTMLElement = Render.elementFactory(
      'div',
      {
        className: 'board-container',
      },
    );
    const playersDataPanel: HTMLElement = Render.elementFactory(
      'div',
      { className: 'players__data' },
    );
    const playerName: HTMLElement = Render.elementFactory(
      'h3',
      {
        className: 'players__data__name',
        style: `color:${playersColor}`,
      },
      playersChosenName,
    );
    const playerAvatar: HTMLElement = Render.elementFactory('img', {
      className: 'players__data__avatar',
      src: playersChosenAvatarPath,
    });
    //  TO DO: ADD INSTANCE OF CLASS GAMECONTROLLER;
    const herd = new Herd();

    const herdView: HTMLElement = Render.elementFactory('div', {
      className: 'players__herd',
    });

    const playerHerd = herd.theAnimals.map(([animal, count]) => [
      animal.theName,
      count,
    ]);
    const herdImagesAndCounts = playerHerd.map(
      ([nameElement, countElement]) => {
        if (
          nameElement === 'big dog' ||
          nameElement === 'small dog'
        ) {
          const animalImg = Render.elementFactory('img', {
            className: 'players__herd__img',
            src: `../../../static/images/avatars/dog.png`,
          });

          console.log(animalImg, countElement);
          const animalCount = Render.elementFactory(
            'div',
            { className: 'players__herd__count' },
            `x${countElement}`,
          );

          return [animalImg, animalCount];
        }
        const animalImg = Render.elementFactory('img', {
          className: 'players__herd__img',
          src: `../../../static/images/avatars/${nameElement}.png`,
        });
        const animalCount = Render.elementFactory(
          'div',
          { className: 'players__herd__count' },
          `x${countElement}`,
        );
        return [animalImg, animalCount];
      },
    );

    Render.childrenInjector(
      herdView,
      ...flatten(herdImagesAndCounts),
    );

    Render.childrenInjector(
      playersDataPanel,
      playerName,
      playerAvatar,
    );
    Render.childrenInjector(
      playersBoardContainer,
      playersDataPanel,
      herdView,
    );
    Render.render('#sf-app', playersBoardContainer);
  }
}
