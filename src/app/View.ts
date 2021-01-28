import { Render } from './utils/Render';
import { Timer } from './Timer';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { GameController } from './GameController';
import { BreedProcessor } from './BreedProcessor';
import { count } from 'console';
// import { Herd } from './logic/Herd';
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
    const newPlayer = new Player(
      playersChosenName,
      playersChosenAvatarPath,
    );
    const newTimer = new Timer(15);
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
    const remainingTime = Render.elementFactory(
      'div',
      {
        className: 'remainig-time__counter',
      },

      `Time Left : ${newTimer.theTurnTimeLeft} s`,
    );

    const gameController = new GameController(
      newPlayer,
      newTimer,
      new BreedProcessor(),
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

    rollADiceButton.addEventListener('click', () => {
      const rollResult = gameController.breed();
      herdView.innerText = JSON.stringify(
        newPlayer.theHerd.theAnimals.map(([animal, count]) => [
          animal.theName,
          count,
        ]),
      );
      rollResultView.innerText = JSON.stringify(rollResult);
      gameController.nextPlayer();
      gameController.startTurn();
    });
    // TODO find a solution for the Timer - now it's not working right
    setInterval(() => {
      remainingTime.innerText = `Time Left : ${newTimer.theTurnTimeLeft} s`;
    }, 1000);
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
    };
    backToMenuButton.addEventListener('click', handleBackClick);
  }
}
