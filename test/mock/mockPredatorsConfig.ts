import { AnimalNames } from '../../src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../src/Enums/AnimalRolesEnum';
import { PredatorsConfigInterface } from '../../src/Interfaces/PredatorsConfigInterface';
export const mockWolf: PredatorsConfigInterface = {
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

export const mockFox: PredatorsConfigInterface = {
  name: AnimalNames.FOX,
  path: '/static/images/avatars/fox.png',
  roles: AnimalRoles.PREDATOR,
  kills: [AnimalNames.RABBIT],
  isChasedAwayBy: AnimalNames.SMALL_DOG,
  exclamation: 'Ringangngnignign',
  // dice: [{ diceNumber: 2, probability: 1 }],
};
