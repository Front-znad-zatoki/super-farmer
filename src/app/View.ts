import { Render } from './utils/Render';
import { Timer } from './Timer';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { GameController } from './GameController';
export class View {
  renderMenuView(): void {
    const inputName = Render.elementFactory('input', {
      className: 'input__name',
      placeholder: 'Carlos Santana',
    });
    const container = Render.elementFactory('div', {
      className: 'container-img',
    });
    const avatarsElements = Object.values(AnimalNames).map(
      (animalName) => {
        if (
          animalName === AnimalNames.BIG_DOG ||
          animalName === AnimalNames.SMALL_DOG
        ) {
          return Render.elementFactory('img', {
            className: 'container-img__avatar',
            src: `./static/images/avatars/dog.png`,
          });
        }

        return Render.elementFactory('img', {
          className: 'container-img__avatar',
          src: `./static/images/avatars/${animalName}.png`,
        });
      },
    );
    console.log(avatarsElements);
    avatarsElements.splice(5, 1);
    const startGameButton = Render.elementFactory(
      'button',
      {
        className: 'button__start button',
      },
      'Start Game',
    );
    Render.childrenInjector(container, ...avatarsElements);
    Render.render('#sf-app', inputName, container, startGameButton);

    let playersChosenAvatarPath = '';
    avatarsElements.forEach((el) => {
      el.addEventListener('click', (e): void => {
        playersChosenAvatarPath = (e.target as any).src;
      });
    });

    const handleClick = () => {
      const inputValue =
        (<HTMLInputElement>inputName).value === ''
          ? 'Carlos Santana'
          : (<HTMLInputElement>inputName).value;
      playersChosenAvatarPath =
        playersChosenAvatarPath === ''
          ? `./static/images/avatars/sheep.png`
          : playersChosenAvatarPath;

      Render.removeAllChildren('#sf-app');
      this.renderGameView(inputValue, playersChosenAvatarPath);
    };
    startGameButton.addEventListener('click', handleClick);
  }

  renderGameView(
    playersChosenName: string,
    playersChosenAvatarPath: string,
  ): void {
    const playerName = Render.elementFactory(
      'h3',
      {
        className: 'player__name',
      },
      playersChosenName,
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
    const backToMenuButton = Render.elementFactory(
      'button',
      {
        className: 'button__back button',
      },
      'Back To Menu',
    );
    const rollADiceButton = Render.elementFactory(
      'button',
      {
        className: 'button__dice button',
      },
      'Roll a dice',
    );
    const containerButtons = Render.elementFactory('div', {
      className: 'container-buttons',
    });
    const containerGame = Render.elementFactory('div', {
      className: 'container-game',
    });
    const timerUpdate = setInterval(() => {
      remainingTime.innerText = `Time Left : ${gameController.theTimer.theTurnTimeLeft} s`;
      if (gameController.theTimer.theTurnTimeLeft === 0) {
        alert('Your time is up!');
        gameController.nextPlayer();
        gameController.startTurn();
      }
    }, 1000);

    rollADiceButton.addEventListener('click', () => {
      const rollResult = gameController.breed();
      herdView.innerText = JSON.stringify(
        gameController.theCurrentPlayer.theHerd.theAnimals.map(
          ([animal, count]) => [animal.theName, count],
        ),
      );
      rollResultView.innerText = JSON.stringify(rollResult);
      gameController.nextPlayer();
      setTimeout(() => gameController.startTurn(), 1000);
    });
    // FIX find a solution for the Timer - now it's not working right

    gameController.startTurn();

    Render.childrenInjector(
      containerButtons,
      backToMenuButton,
      rollADiceButton,
    );
    Render.childrenInjector(
      containerGame,
      playerName,
      playerAvatar,
      remainingTime,
      containerButtons,
      rollResultView,
      herdView,
    );
    Render.render('#sf-app', containerGame);
    const handleBackClick = () => {
      Render.removeAllChildren('#sf-app');
      this.renderMenuView();
      gameController.theTimer.resetTurn();
      clearInterval(timerUpdate);
    };
    backToMenuButton.addEventListener('click', handleBackClick);
  }
}
