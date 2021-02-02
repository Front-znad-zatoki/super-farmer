import { Render } from './utils/Render';
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
          src: `./static/images/avatars/${animalName.toLowerCase()}.png`,
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
    const gameController = new GameController(this);
    const remainingTime = Render.elementFactory('div', {
      id: 'time-remaining',
      className: 'remainig-time__counter',
    });
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

    rollADiceButton.addEventListener('click', () => {
      const rollResult = gameController.breed();
      herdView.innerText = JSON.stringify(
        gameController.theCurrentPlayer.theHerd.theAnimals.map(
          ([animal, count]) => [animal.theName, count],
        ),
      );
      rollResultView.innerText = JSON.stringify(rollResult);
      gameController.nextPlayer();
      setTimeout(() => gameController.startTurn(), 50);
    });

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
      gameController.stopTurn();
      setTimeout(() => {
        Render.removeAllChildren('#sf-app');
        this.renderMenuView();
      }, 20);
    };
    backToMenuButton.addEventListener('click', handleBackClick);
  }

  updateRemainingTime(timeLeft: number): void {
    Render.removeAllChildren('#time-remaining');
    Render.render('#time-remaining', `Time Left : ${timeLeft} s`);
  }

  displayAlert(name: string): void {
    alert(`${name}'s turn has passed!`);
  }
}
