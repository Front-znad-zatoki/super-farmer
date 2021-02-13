import { Player } from '../../Player';
import { Render } from '../utils/Render';
import { flatten } from 'lodash';

export class PlayersBoard {
  /*returns player's board with player's name, avatar and herd */
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
    const playerTimer: HTMLElement = Render.elementFactory(
      'div',
      { className: 'player-data__time' },
      `Time left`,
    );

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
      playerTimer,
    );
    Render.childrenInjector(
      playersBoardContainer,
      playersDataPanel,
      herdView,
    );
    /*
    this.view.stopTimer();
    setTimeout(() => this.hideTimer(), 10);
  }

  private hideTimer(): void {
    (document.querySelector(
      '#time-left',
    ) as HTMLElement).style.display = 'none';
  }

  /**
   * Updates timer on player panel
   * @param timeLeft accepts number value for time left
   */
    /*updateTime(timeLeft: number): void {
    const timer = document.querySelector('#time-left') as HTMLElement;
    timer.innerText = `Time left: ${timeLeft} sec.`;
  }

  turnAlert(): void {
    Render.render(
      '#sf-app',
      Render.elementFactory(
        'div',
        { className: 'exclamation' },
        `${player.}'s turn has passed!`,
      ),
    );
  }

  disableTrade(): void {
    (document.querySelector('#exchange') as HTMLElement).setAttribute(
      'disabled',
      'true',
    );
  }*/
    return playersBoardContainer;
  }
}
