import { Render } from '../utils/Render';
import { flatten } from 'lodash';
import { Player } from '../../Player';

export class PlayersBoard {
  /* returns player's board with player's name, avatar and herd */
  renderPlayersBoard(
    playersChosenName: string,
    playersChosenAvatarPath: string,
    //(when will the color in Player) playersColor: string,
  ): HTMLElement {
    const player = new Player(
      playersChosenName,
      playersChosenAvatarPath,
    );
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
        // style: `color:${playersColor}`,
      },
      playersChosenName,
    );
    const playerAvatar: HTMLElement = Render.elementFactory('img', {
      className: 'players__data__avatar',
      src: playersChosenAvatarPath,
    });

    const herdView: HTMLElement = Render.elementFactory('div', {
      className: 'players__herd',
    });

    const playerHerd: [
      string,
      number,
    ][] = player.theHerd.theAnimals.map(([animal, count]) => [
      animal.theName,
      count,
    ]);
    const herdImagesAndCounts: HTMLElement[][] = playerHerd.map(
      ([nameElement, countElement]) => {
        if (
          nameElement === 'big dog' ||
          nameElement === 'small dog'
        ) {
          const animalImg: HTMLElement = Render.elementFactory(
            'img',
            {
              className: 'players__herd__img',
              src: `../../../static/images/avatars/dog.png`,
            },
          );

          const animalCount: HTMLElement = Render.elementFactory(
            'div',
            { className: 'players__herd__count' },
            `x${countElement}`,
          );

          return [animalImg, animalCount];
        }
        const animalImg: HTMLElement = Render.elementFactory('img', {
          className: 'players__herd__img',
          src: `../../../static/images/avatars/${nameElement}.png`,
        });
        const animalCount: HTMLElement = Render.elementFactory(
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
    return playersBoardContainer;
  }
}
