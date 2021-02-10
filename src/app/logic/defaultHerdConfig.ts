import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';

export const defaultPlayerHerdConfig: HerdConfigInterface[] = [
  {
    name: AnimalNames.RABBIT,
    tradeValue: 1,
    path: './static/images/avatars/rabbit.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 0,
  },
  {
    name: AnimalNames.SHEEP,
    tradeValue: 6,
    path: './static/images/avatars/sheep.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 0,
  },
  {
    name: AnimalNames.PIG,
    tradeValue: 12,
    path: './static/images/avatars/pig.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 0,
  },
  {
    name: AnimalNames.COW,
    tradeValue: 36,
    path: './static/images/avatars/cow.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 0,
  },
  {
    name: AnimalNames.HORSE,
    tradeValue: 72,
    path: './static/images/avatars/horse.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 0,
  },
  {
    name: AnimalNames.SMALL_DOG,
    tradeValue: 6,
    path: './static/images/avatars/small_dog.svg',
    role: AnimalRoles.GUARDIAN,
    inStock: 0,
    chasesAway: AnimalNames.FOX,
  },
  {
    name: AnimalNames.BIG_DOG,
    tradeValue: 36,
    path: './static/images/avatars/big_dog.svg',
    role: AnimalRoles.GUARDIAN,
    inStock: 0,
    chasesAway: AnimalNames.WOLF,
  },
];
