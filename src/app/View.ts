import { Render } from './utils/Render';
import { Timer } from './Timer';
import { AnimalNames, Predators } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
// import { Herd } from './logic/Herd';
export class View {
  renderMenuView(): void {
    const inputName = Render.elementFactory('input', {
      className: 'input__name',
      placeholder: 'Please fill your name',
    });
    const startGameButton = Render.elementFactory(
      'button',
      {
        className: 'button__start button',
      },
      'Start Game',
    );
    // TO FIND OUT:  WHAT ARE THE PLAYERS POSSIBLE AVATARS ?
    const avatarsElements = Object.values(AnimalNames).map(
      (animalName) => {
        // TODO: RENDER JUST ONE DOG IF AVATARS ARE ANIMALS
        if (animalName === AnimalNames.BIG_DOG) {
          return Render.elementFactory('img', {
            src: `../../resources/images/avatars/dog.png`,
            //TODO: ADD CLASSES
          });
        }
        // TODO: REMOVE UNDEFINED ITEM FROM TARGET ARRAY
        // if (animalName === AnimalNames.SMALL_DOG) {
        //   return;
        // }
        return Render.elementFactory('img', {
          src: `../../resources/images/avatars/${animalName}.png`,
        });
      },
    );
    console.log(avatarsElements);
    Render.render(
      '#sf-app',
      inputName,
      startGameButton,
      ...avatarsElements,
    );
    avatarsElements.forEach((el) => {
      el.addEventListener('click', (e): void => {
        const playersChosenAvatarPath = (e.target as any).src;
        console.log(playersChosenAvatarPath);
      });
    });
    inputName.addEventListener('input', (e): void => {
      const playersChosenName = (e.target as any).value;
      return playersChosenName;
    });
    // startGameButton.addEventListener('click', this.renderGameView);
  }

  renderGameView(
    playersChosenName: string,
    playersChosenAvatarPath: string,
  ): void {
    // TODO: CREATE PLAYER
    // TODO: SEND INFO TO PLAYER ABOUT NAME AND AVATAR
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
      //TODO: RENDER TIMER
      `Time Left : ${newTimer.theTurnTimeLeft} s`,
    );
    // TODO: SET INTERVAL TO CHECK TIMER EACH SECOND
    // newTimer.countdown();
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
    console.log(Predators);
    // TODO: RENDER FARM ANIMALS WITH NUMBER IN STOCK
    newPlayer.theHerd.theAnimals.forEach((animal) => {
      console.log(animal);
      // animal[0] => object of animal
      // animal[1] => how many
      //TODO: RENDER ANIMAL'S AVATAR AND NUMBER IN STOCK
    });

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
