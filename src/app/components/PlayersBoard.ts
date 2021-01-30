import { Render } from '../utils/Render';
import { GameController } from '../GameController';
import { flatten } from 'lodash';

export class PlayersBoard {
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
      { className: 'board-container__data' },
    );
    const playerName = Render.elementFactory(
      'h3',
      {
        className: 'board-container__data__name',
        style: `color:${playersColor}`,
      },
      playersChosenName,
    );
    const playerAvatar = Render.elementFactory('img', {
      className: 'player__avatar',
      src: playersChosenAvatarPath,
    });
    const gameController = new GameController(playersChosenName);
    const herdView = Render.elementFactory('div', {
      className: 'herd__container',
    });

    const playerHerd = gameController.theCurrentPlayer.theHerd.theAnimals.map(
      ([animal, count]) => [animal.theName, count],
    );
    const herdImagesAndCounts = playerHerd.map(
      ([nameElement, countElement]) => {
        if (
          nameElement === 'big dog' ||
          nameElement === 'small dog'
        ) {
          const animalImg = Render.elementFactory(
            // 'div',
            // { className: 'animal-img__item' },
            'img',
            {
              src: `../../../static/images/avatars/dog.png`,
            },
          );
          console.log(animalImg, countElement);
          const animalCount = Render.elementFactory(
            'div',
            { className: 'count-element__item' },
            `x${countElement}`,
          );

          return [animalImg, animalCount];
        }
        const animalImg = Render.elementFactory('img', {
          src: `../../../static/images/avatars/${nameElement}.png`,
        });
        const animalCount = Render.elementFactory(
          'div',
          { className: 'count__div' },
          `x${countElement}`,
        );
        console.log(animalCount);
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
