import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';

export const defaultGameConfiguration: GameConfigInterface = {
  mode: GameModes.STATIC,
  roundTimeInSeconds: 15,
  playersConfig: [
    {
      name: 'Carlos Santanos',
      path: '../../static/images/avatars/dog.png',
    },
    {
      name: 'Pablo Escofarmo',
      path: '../../static/images/avatars/cow.png',
    },
  ],

  farmAnimalsConfig: [
    { name: AnimalNames.RABBIT, bankStock: 60, playersFarmStock: 0 },
    { name: AnimalNames.SHEEP, bankStock: 24, playersFarmStock: 0 },
    { name: AnimalNames.PIG, bankStock: 20, playersFarmStock: 0 },
    { name: AnimalNames.COW, bankStock: 12, playersFarmStock: 0 },
    { name: AnimalNames.HORSE, bankStock: 4, playersFarmStock: 0 },
    {
      name: AnimalNames.SMALL_DOG,
      bankStock: 4,
      playersFarmStock: 0,
    },
    {
      name: AnimalNames.BIG_DOG,
      bankStock: 2,
      playersFarmStock: 0,
    },
  ],
  predatorAnimalsConfig: [
    {
      name: AnimalNames.FOX,
      kills: [AnimalNames.RABBIT],
      isChasedAwayBy: [AnimalNames.SMALL_DOG],
    },
    {
      name: AnimalNames.WOLF,
      kills: [
        AnimalNames.RABBIT,
        AnimalNames.SHEEP,
        AnimalNames.PIG,
        AnimalNames.COW,
      ],
      isChasedAwayBy: [AnimalNames.BIG_DOG],
    },
  ],
  diceConfig: [
    [
      { name: AnimalNames.RABBIT, probability: 6 },
      { name: AnimalNames.SHEEP, probability: 2 },
      { name: AnimalNames.PIG, probability: 2 },
      { name: AnimalNames.HORSE, probability: 1 },
      { name: AnimalNames.FOX, probability: 1 },
    ],
    [
      { name: AnimalNames.RABBIT, probability: 6 },
      { name: AnimalNames.SHEEP, probability: 3 },
      { name: AnimalNames.PIG, probability: 1 },
      { name: AnimalNames.COW, probability: 1 },
      { name: AnimalNames.FOX, probability: 1 },
    ],
  ],
};
