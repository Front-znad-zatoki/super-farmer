import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { PredatorsConfigInterface } from '../../Interfaces/PredatorsConfigInterface';

export const mockPredatorConfig: PredatorsConfigInterface[] = [
  {
    name: AnimalNames.FOX,
    path: '/static/images/avatars/fox.png',
    kills: [AnimalNames.RABBIT],
    isChasedAwayBy: [AnimalNames.SMALL_DOG],
    exclamation:
      'Ring-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow!',
    dice: [{ diceNumber: 1, probability: 1 }],
  },
  {
    name: AnimalNames.WOLF,
    path: '/static/images/avatars/wolf.png',
    kills: [
      AnimalNames.RABBIT,
      AnimalNames.SHEEP,
      AnimalNames.PIG,
      AnimalNames.COW,
    ],
    isChasedAwayBy: [AnimalNames.BIG_DOG],
    exclamation: 'Auuuuuu!Grrrrr!',
    dice: [{ diceNumber: 2, probability: 1 }],
  },
];
