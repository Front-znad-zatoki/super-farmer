import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { Predator } from '../../Animals/Predator';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { PredatorsConfigInterface } from '../../Interfaces/PredatorsConfigInterface';
import { dynamicGameConfiguration } from '../logic/dynamicGameConfiguration';
import { Game } from '../logic/Game';

export function logGameObject(): void {
  const mockGame = new Game(dynamicGameConfiguration);
  console.log(mockGame);
  mockGame.theCurrentPlayer.theHerd.addAnimalsToHerd(
    AnimalNames.RABBIT,
    10,
  );
  // mockGame.theCurrentPlayer.theHerd.addAnimalsToHerd(
  //   AnimalNames.BIG_DOG,
  //   1,
  // );
  // mockGame.theCurrentPlayer.theHerd.addAnimalsToHerd(
  //   AnimalNames.SMALL_DOG,
  //   1,
  // );
  // mockGame.theCurrentPlayer.theHerd.cullAnimals(
  // new Predator(
  //   mockWolf.name,
  //   mockWolf.path,
  //   undefined,
  //   mockWolf.kills,
  //   mockWolf.isChasedAwayBy,
  //   mockWolf.exclamation,
  // ),
  // GameModes.DYNAMIC,
  // );
  mockGame.theCurrentPlayer.theHerd.cullAnimals(
    new Predator(
      mockFox.name,
      mockFox.path,
      undefined,
      mockFox.kills,
      mockFox.isChasedAwayBy,
      mockFox.exclamation,
    ),
    GameModes.DYNAMIC,
  );
}

const mockWolf: PredatorsConfigInterface = {
  name: AnimalNames.WOLF,
  path: '/static/images/avatars/wolf.png',
  roles: AnimalRoles.PREDATOR,
  kills: [
    AnimalNames.RABBIT,
    AnimalNames.SHEEP,
    AnimalNames.PIG,
    AnimalNames.COW,
  ],
  isChasedAwayBy: AnimalNames.BIG_DOG,
  exclamation: 'Auuuuuu!Grrrrr!',
  // dice: [{ diceNumber: 2, probability: 1 }],
};

const mockFox: PredatorsConfigInterface = {
  name: AnimalNames.FOX,
  path: '/static/images/avatars/fox.png',
  roles: AnimalRoles.PREDATOR,
  kills: [AnimalNames.RABBIT],
  isChasedAwayBy: AnimalNames.SMALL_DOG,
  exclamation: 'Ringangngnignign',
  // dice: [{ diceNumber: 2, probability: 1 }],
};
