import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';

export const defaultBankConfig: HerdConfigInterface[] = [
  {
    name: AnimalNames.RABBIT,
    tradeValue: 1,
    path: './static/images/avatars/rabbit.png',
    role: AnimalRoles.LIVESTOCK,
    inStock: 60,
  },
  {
    name: AnimalNames.SHEEP,
    tradeValue: 6,
    path: './static/images/avatars/sheep.png',
    role: AnimalRoles.LIVESTOCK,
    inStock: 24,
  },
  {
    name: AnimalNames.PIG,
    tradeValue: 12,
    path: './static/images/avatars/pig.png',
    role: AnimalRoles.LIVESTOCK,
    inStock: 20,
  },
  {
    name: AnimalNames.COW,
    tradeValue: 36,
    path: './static/images/avatars/cow.png',
    role: AnimalRoles.LIVESTOCK,
    inStock: 12,
  },
  {
    name: AnimalNames.HORSE,
    tradeValue: 72,
    path: './static/images/avatars/horse.png',
    role: AnimalRoles.LIVESTOCK,
    inStock: 4,
  },
  {
    name: AnimalNames.SMALL_DOG,
    tradeValue: 6,
    path: './static/images/avatars/dog.png',
    role: AnimalRoles.GUARDIAN,
    inStock: 4,
    chasesAway: AnimalNames.FOX,
  },
  {
    name: AnimalNames.BIG_DOG,
    tradeValue: 36,
    path: './static/images/avatars/dog.png',
    role: AnimalRoles.GUARDIAN,
    inStock: 2,
    chasesAway: AnimalNames.WOLF,
  },
];
