import { Render } from '../utils/Render';
import { GameController } from '../GameController';
import { flatten } from 'lodash';

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
    const remainingTime = Render.elementFactory(
      'div',
      {
        className: 'remainig-time__counter',
      },

      `Time Left : ${gameController.theTimer.theTurnTimeLeft} s`,
    );
    const herdView = Render.elementFactory('div');
    const rollResultView = Render.elementFactory('div');
    rollResultView.addEventListener('click', () => {
      gameController.breed();
    });

    setInterval(() => {
      remainingTime.innerText = `Time Left : ${gameController.theTimer.theTurnTimeLeft} s`;
      if (gameController.theTimer.theTurnTimeLeft === 0) {
        alert('Your time is up!');
        gameController.nextPlayer();
        gameController.startTurn();
      }
    }, 1000);
    rollDiceButton.addEventListener('click', () => {
      Render.removeAllChildren(rollResultView);
      const rollResult = gameController.breed();
      const playerHerd = gameController.theCurrentPlayer.theHerd.theAnimals.map(
        ([animal, count]) => [animal.theName, count],
      );
      const herdImagesAndCounts = playerHerd.map(
        ([nameElement, countElement]) => {
          if (
            nameElement === 'big dog' ||
            nameElement === 'small dog'
          ) {
            const animalImg = Render.elementFactory('img', {
              src: `../../../static/images/avatars/dog.png`,
            });
            console.log(animalImg, countElement);
            const animalCount = Render.elementFactory(
              'div',
              { className: 'count__div' },
              countElement as string,
            );

            return [animalImg, animalCount];
          }
          const animalImg = Render.elementFactory('img', {
            src: `../../../static/images/avatars/${nameElement}.png`,
          });
          const animalCount = Render.elementFactory(
            'div',
            { className: 'count__div' },
            countElement as string,
          );
          console.log(animalCount);
          return [animalImg, animalCount];
        },
      );

      console.log(herdImagesAndCounts);

      Render.childrenInjector(
        herdView,
        ...flatten(herdImagesAndCounts),
      );

      const rollResults = rollResult as string[];
      const diceImages = rollResults.map((result) => {
        if (result === 'big dog' || result === 'small dog') {
          return Render.elementFactory('img', {
            src: `../../../static/Image/avatars/dog.png`,
          });
        }
        return Render.elementFactory('img', {
          src: `../../../static/images/avatars/${result}.png`,
        });
      });
      Render.childrenInjector(rollResultView, ...diceImages);
      gameController.nextPlayer();
      setTimeout(() => gameController.startTurn(), 1000);
    });
    gameController.startTurn();

    Render.childrenInjector(
      playersBoardContainer,
      herdView,
      remainingTime,
      rollDiceButton,
      rollResultView,
      exchangeButton,
      playerAvatar,
    );
    Render.render('#sf-app', playersBoardContainer);
  }
}
