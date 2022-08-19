import { Player } from '../../Player';
import { Render } from '../utils/Render';

export class PlayersBoard {
  private playerTimer: HTMLElement;
  private playersBoardContainer: HTMLElement;
  constructor(private player: Player) {
    this.playerTimer = Render.elementFactory('div', {
      className: 'players__data__time',
    });
    this.playersBoardContainer = Render.elementFactory('div', {
      className: 'board-container',
      style: `border-color: transparent;`,
    });
    this.renderPlayersBoard(player);
  }

  /*returns player's board with player's name, avatar and herd */
  private renderPlayersBoard(player: Player): void {
    if (this.playersBoardContainer.children) {
      Render.removeAllChildren(this.playersBoardContainer);
    }
    const playersDataPanel: HTMLElement = Render.elementFactory(
      'div',
      { className: 'players__data' },
    );
    const playerName: HTMLElement = Render.elementFactory(
      'h3',
      {
        className: 'players__data__name',
      },
      player.theName,
    );
    const playerAvatar: HTMLElement = Render.elementFactory(
      'div',
      {
        className: 'players__data__avatar',
      },
      Render.elementFactory('img', {
        className: 'players__data__avatar--img',
        src: player.theAvatar,
      }),
    );
    const herdView = Render.elementFactory('div', {
      className: 'players__herd',
    });
    const playerHerd = player.theHerd.theAnimals.map(
      ([animal, count]) =>
        Render.elementFactory(
          'div',
          {
            className: 'players__herd__item',
            style: `${
              animal.theName === 'small dog' ? 'padding: .5rem;' : ''
            }`,
          },
          Render.elementFactory('img', {
            className: 'players__herd__item__img',
            src: animal.theImagePath,
            alt: animal.theName,
            style: `${
              animal.theName === 'small dog'
                ? 'height: 3rem; width: auto;'
                : ''
            }`,
          }),
          Render.elementFactory(
            'p',
            { className: 'players__herd__item__text' },
            `${count}`,
          ),
        ),
    );
    Render.childrenInjector(
      playersDataPanel,
      playerName,
      playerAvatar,
      this.playerTimer,
    );
    Render.childrenInjector(herdView, ...playerHerd);
    Render.childrenInjector(
      this.playersBoardContainer,
      herdView,
      playersDataPanel,
    );
  }
  /*updates timer on players board*/
  updateTime(timeLeft: number): void {
    this.playerTimer.innerHTML =
      timeLeft < 10
        ? `<h3>0:0${timeLeft}</h3><p>time left</p>`
        : `<h3>0:${timeLeft}</h3><p>time left</p>`;
  }

  setBorderAndTimer(): void {
    this.playerTimer.style.display = 'flex';
    this.playersBoardContainer.style.borderColor = `${this.player.theColor}`;
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(
      (button) =>
        ((button as HTMLElement).style.borderColor = `${this.player.theColor}`),
    );
  }

  removeBorderAndTimer(): void {
    this.playersBoardContainer.style.borderColor = `transparent`;
    this.hideTimer();
  }

  updateBoard(): void {
    this.renderPlayersBoard(this.player);
  }

  get thePlayerBoard(): HTMLElement {
    return this.playersBoardContainer;
  }

  get thePlayer(): Player {
    return this.player;
  }

  hideTimer(): void {
    this.playerTimer.style.display = 'none';
  }
}
