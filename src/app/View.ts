import { Render } from './utils/Render';
import { Timer } from './Timer';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
export class View {
  renderMenuView(): void {
    const inputName = Render.elementFactory('input', {
      className: 'input__name',
      placeholder: 'Please fill your name',
    });
    const startGameButton = Render.elementFactory('button', {
      className: 'start__button',
      innerHTML: '<p> Start Game </p>',
    });
    const img = Object.values(AnimalNames).map((animalName) => {
      if (animalName === 'big dog') {
        return Render.elementFactory('img', {
          src: `./resources/images/avatars/dog.png`,
        });
      }
      if (animalName === 'small dog') {
        return;
      }
      return Render.elementFactory('img', {
        src: `./resources/images/avatars/${animalName}.png`,
      });
    });

    Render.render('#sf-app', inputName, startGameButton);
    startGameButton.addEventListener('click', this.renderGameView);
  }

  renderGameView(): void {
    const playerName = Render.elementFactory('div', {
      className: 'player__name',
      innerHTML: '<p>Kornel</p>',
    });
    const playerAvatar = Render.elementFactory('img', {
      className: 'back__avatar',
    });
    const remainingTime = Render.elementFactory('div', {
      className: 'remainig-time__counter',
      textContent: 'Time Left : 02 m 00 s',
    });
    const backToMenuButton = Render.elementFactory('button', {
      className: 'back__button',
      textContent: 'Back To Menu',
    });
    const RollADice = Render.elementFactory('button', {
      className: 'dice__button',
      textContent: 'Roll a dice',
    });
  }
}
