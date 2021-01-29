import { Render } from '../utils/Render';
import { GameController } from '../GameController';

export class PlayersBoard {
  renderPlayersBoard(
    playersChosenAvatarPath: string,
    playersChosenName: string,
  ): void {
    const playersBoardContainer: HTMLElement = Render.elementFactory(
      'div',
      {
        className: 'board__container',
      },
    );
    const rollDiceButton: HTMLElement = Render.elementFactory(
      'button',
      {
        className: 'button__dice button',
      },
      'Roll a dice',
    );
    const exchangeButton: HTMLElement = Render.elementFactory(
      'button',
      {
        className: 'button__exchange button',
      },
      'Exchange',
    );
    const playerAvatar = Render.elementFactory('img', {
      className: 'player__avatar',
      src: playersChosenAvatarPath,
    });
    const gameController = new GameController(playersChosenName);
    const herdView = Render.elementFactory('div');
    const rollResultView = Render.elementFactory('div');
    let diceImages: any[] = [];
    rollResultView.addEventListener('click', () => {
      gameController.breed();
    });
    rollDiceButton.addEventListener('click', () => {
      const rollResult = gameController.breed();
      herdView.innerText = JSON.stringify(
        gameController.theCurrentPlayer.theHerd.theAnimals.map(
          ([animal, count]) => [animal.theName, count],
        ),
      );
      const rollResults = rollResult as string[];
      console.log(rollResults);
      diceImages = rollResults.map((result) => {
        console.log(result);
        if (result === 'big dog' || result === 'small dog') {
          return Render.elementFactory('img', {
            src: `../../../static/images/avatars/dog.png`,
          });
        }
        return Render.elementFactory('img', {
          src: `../../../static/images/avatars/${result}.png`,
        });
      });
      console.log(diceImages);
    });

    Render.childrenInjector(rollResultView, ...diceImages);
    Render.childrenInjector(
      playersBoardContainer,
      herdView,
      rollDiceButton,
      rollResultView,
      ...diceImages,
      exchangeButton,
      playerAvatar,
    );
    Render.render('#sf-app', playersBoardContainer);
  }
}
