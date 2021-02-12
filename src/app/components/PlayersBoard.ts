import { Render } from '../utils/Render';
import { flatten } from 'lodash';
import { Player } from '../../Player';

export class PlayersBoard {
  /* returns player's board with player's name, avatar and herd */
  renderPlayersBoard(player: Player): HTMLElement {
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
        style: `color:${player.theColor}`,
      },
      player.theName,
    );
    const playerAvatar: HTMLElement = Render.elementFactory('img', {
      className: 'players__data__avatar',
      src: player.theAvatar,
    });
    const herdView: HTMLElement = Render.elementFactory('div', {
      className: 'players__herd',
    });

    const playerHerd: [
      string,
      number,
    ][] = player.theHerd.theAnimals.map(([animal, count]) => [
      animal.theImagePath,
      count,
    ]);
    const herdImagesAndCounts: HTMLElement[][] = playerHerd.map(
      ([pathElement, countElement]) => {
        const animalImg: HTMLElement = Render.elementFactory('img', {
          className: 'players__herd__img',
          src: pathElement,
          style: `filter: ${countElement}<=0?grayscale(100%):grayscale(0)`,
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
      herdView,
      playersDataPanel,
    );
    Render.render('#sf-app', playersBoardContainer);
    return playersBoardContainer;
  }
}
