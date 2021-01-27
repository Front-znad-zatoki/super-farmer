import { Render } from './utils/Render';
import { Timer } from './Timer';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';

export class View {
  renderMenuView(): void {
    const inputName = Render.elementFactory('input', {
      className: 'input__name',
      placeholder: 'Carlos Santana',
    });
    const startGameButton = Render.elementFactory(
      'button',
      {
        className: 'button__start button',
      },
      'Start Game',
    );
    const avatarsElements = Object.values(AnimalNames).map(
      (animalName) => {
        if (animalName === AnimalNames.BIG_DOG) {
          return Render.elementFactory('img', {
            src: `./static/images/avatars/dog.png`,
          });
        }
        return Render.elementFactory('img', {
          src: `./static/images/avatars/${animalName}.png`,
        });
      },
    );
    Render.render(
      '#sf-app',
      inputName,
      startGameButton,
      ...avatarsElements,
    );

    let playersChosenAvatarPath = '';
    avatarsElements.forEach((el) => {
      el.addEventListener('click', (e): void => {
        playersChosenAvatarPath = (e.target as any).src;
        console.log(playersChosenAvatarPath);
      });
    });

    const handleClick = () => {
      const inputValue =
        (<HTMLInputElement>inputName).value === ''
          ? 'Carlos Santana'
          : (<HTMLInputElement>inputName).value;
      const newPlayer = new Player(
        inputValue,
        playersChosenAvatarPath,
      );
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
    console.log(newTimer);
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
    backToMenuButton.addEventListener('click', this.renderMenuView);

    Render.render(
      '#sf-app',
      playerName,
      playerAvatar,
      remainingTime,
      backToMenuButton,
      rollADiceButton,
    );
  }
}
