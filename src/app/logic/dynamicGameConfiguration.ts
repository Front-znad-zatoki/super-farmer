import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';
import { GameModes } from '../../Enums/GameModeEnums';
import { GameConfigInterface } from '../../Interfaces/GameConfigInterface';

export const dynamicGameConfiguration: GameConfigInterface = {
  mode: GameModes.DYNAMIC,
  roundTimeInSeconds: 15,
  playersConfig: [
    {
      name: 'Carlos Santanos',
      path: '../../static/images/avatars/dog.png',
      color: 'blue',
    },
    {
      name: 'Pablo Escofarmo',
      path: '../../static/images/avatars/cow.png',
      color: 'green',
    },
  ],

  livestockConfig: [
    {
      name: AnimalNames.RABBIT,
      tradeValue: 1,
      path: '/static/images/avatars/rabbit.png',
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 1,
      bankInitialStock: 60,
      dice: [
        { diceNumber: 1, probability: 6 },
        { diceNumber: 2, probability: 6 },
      ],
    },
    {
      name: AnimalNames.SHEEP,
      tradeValue: 6,
      path: '/static/images/avatars/sheep.png',
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
      path: '/static/images/avatars/pig.png',
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
      path: '/static/images/avatars/cow.png',
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 12,
      dice: [{ diceNumber: 2, probability: 1 }],
    },
    {
      name: AnimalNames.HORSE,
      tradeValue: 72,
      path: '/static/images/avatars/horse.png',
      role: AnimalRoles.LIVESTOCK,
      playersInitialStock: 0,
      bankInitialStock: 4,
      dice: [{ diceNumber: 1, probability: 1 }],
    },
  ],
  protectorsConfig: [
    {
      name: AnimalNames.SMALL_DOG,
      tradeValue: 6,
      path: '/static/images/avatars/dog.png',
      role: AnimalRoles.GUARDIAN,
      playersInitialStock: 0,
      bankInitialStock: 4,
      chasesAway: AnimalNames.FOX,
    },
    {
      name: AnimalNames.BIG_DOG,
      tradeValue: 36,
      path: '/static/images/avatars/dog.png', // TODO: CHANGE TO BIG/SMALL DOG
      role: AnimalRoles.GUARDIAN,
      playersInitialStock: 0,
      bankInitialStock: 2,
      chasesAway: AnimalNames.WOLF,
    },
  ],
  predatorsConfig: [
    {
      name: AnimalNames.FOX,
      path: '/static/images/avatars/fox.png',
      kills: [AnimalNames.RABBIT],
      isChasedAwayBy: [AnimalNames.SMALL_DOG],
      dice: [{ diceNumber: 1, probability: 1 }],
    },
    {
      name: AnimalNames.WOLF,
      path: '/static/images/avatars/wolf.png',
      kills: [AnimalNames.SHEEP, AnimalNames.PIG, AnimalNames.COW],
      isChasedAwayBy: [AnimalNames.BIG_DOG],
      dice: [{ diceNumber: 2, probability: 1 }],
    },
  ],
};
