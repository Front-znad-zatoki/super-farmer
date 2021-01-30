import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
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

  herdConfig: [
    {
      name: AnimalNames.RABBIT,
      tradeValue: 1,
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 60,
      dice: [
        { diceNumber: 1, probability: 6 },
        { diceNumber: 2, probability: 6 },
      ],
    },
    {
      name: AnimalNames.SHEEP,
      tradeValue: 6,
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 24,
      dice: [
        { diceNumber: 1, probability: 2 },
        { diceNumber: 2, probability: 3 },
      ],
    },
    {
      name: AnimalNames.PIG,
      tradeValue: 12,
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 20,
      dice: [
        { diceNumber: 1, probability: 2 },
        { diceNumber: 2, probability: 1 },
      ],
    },
    {
      name: AnimalNames.COW,
      tradeValue: 36,
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 12,
      dice: [{ diceNumber: 2, probability: 1 }],
    },
    {
      name: AnimalNames.HORSE,
      tradeValue: 72,
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 4,
      dice: [{ diceNumber: 1, probability: 1 }],
    },
  ],
  predatorAnimalsConfig: [
    {
      name: AnimalNames.FOX,
      kills: [AnimalNames.RABBIT],
      isChasedAwayBy: [AnimalNames.SMALL_DOG],
      dice: [{ diceNumber: 1, probability: 1 }],
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
      dice: [{ diceNumber: 2, probability: 1 }],
    },
  ],
};

// diceConfig: [
//   [
//     { name: AnimalNames.RABBIT, probability: 6 },
//     { name: AnimalNames.SHEEP, probability: 2 },
//     { name: AnimalNames.PIG, probability: 2 },
//     { name: AnimalNames.HORSE, probability: 1 },
//     { name: AnimalNames.FOX, probability: 1 },
//   ],
//   [
//     { name: AnimalNames.RABBIT, probability: 6 },
//     { name: AnimalNames.SHEEP, probability: 3 },
//     { name: AnimalNames.PIG, probability: 1 },
//     { name: AnimalNames.COW, probability: 1 },
//     { name: AnimalNames.FOX, probability: 1 },
//   ],
// ],
