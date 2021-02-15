import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';

export const defaultBankConfig: HerdConfigInterface[] = [
  {
    name: AnimalNames.RABBIT,
    tradeValue: 1,
    path: './static/images/avatars/rabbit.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 60,
  },
  {
    name: AnimalNames.SHEEP,
    tradeValue: 6,
    path: './static/images/avatars/sheep.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 24,
  },
  {
    name: AnimalNames.PIG,
    tradeValue: 12,
    path: './static/images/avatars/pig.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 20,
  },
  {
    name: AnimalNames.COW,
    tradeValue: 36,
    path: './static/images/avatars/cow.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 12,
  },
  {
    name: AnimalNames.HORSE,
    tradeValue: 72,
    path: './static/images/avatars/horse.svg',
    role: AnimalRoles.LIVESTOCK,
    inStock: 4,
  },
  {
    name: AnimalNames.SMALL_DOG,
    tradeValue: 6,
    path: './static/images/avatars/small_dog.svg',
    role: AnimalRoles.GUARDIAN,
    inStock: 4,
    chasesAway: AnimalNames.FOX,
    exclamation: `Woof! Woof! I'm protecting all rabbits in the herd! Woof! Woof!`,
  },
  {
    name: AnimalNames.BIG_DOG,
    tradeValue: 36,
    path: './static/images/avatars/big_dog.svg',
    role: AnimalRoles.GUARDIAN,
    exclamation: `WOOF! WOOF! I'm protecting the whole herd! WOOF! WOOF!`,
    inStock: 2,
    chasesAway: AnimalNames.WOLF,
  },
];
