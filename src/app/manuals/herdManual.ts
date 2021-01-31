import { Value } from '../../Animals/Animal';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';
import { Herd } from '../logic/Herd';

export function herdDemo(): void {
  interface playersHerdConfigInterface {
    name: AnimalNames;
    tradeValue: Value;
    role: AnimalRoles;
    path: string;
    initialStock: number;
  }

  const mockHerdConfig: playersHerdConfigInterface[] = [
    {
      name: AnimalNames.RABBIT,
      tradeValue: 1,
      path: '/static/images/avatars/rabbit.png',
      role: AnimalRoles.LIVESTOCK,
      initialStock: 0,
    },
    {
      name: AnimalNames.SHEEP,
      tradeValue: 6,
      path: '/static/images/avatars/sheep.png',
      role: AnimalRoles.LIVESTOCK,
      initialStock: 0,
    },
    {
      name: AnimalNames.PIG,
      tradeValue: 12,
      path: '/static/images/avatars/pig.png',
      role: AnimalRoles.LIVESTOCK,
      initialStock: 0,
    },
    {
      name: AnimalNames.COW,
      tradeValue: 36,
      path: '/static/images/avatars/cow.png',
      role: AnimalRoles.LIVESTOCK,
      initialStock: 0,
    },
    {
      name: AnimalNames.HORSE,
      tradeValue: 72,
      path: '/static/images/avatars/horse.png',
      role: AnimalRoles.LIVESTOCK,
      initialStock: 0,
    },
    {
      name: AnimalNames.SMALL_DOG,
      tradeValue: 6,
      path: '/static/images/avatars/dog.png',
      role: AnimalRoles.GUARDIAN,
      initialStock: 0,
    },
    {
      name: AnimalNames.BIG_DOG,
      tradeValue: 36,
      path: '/static/images/avatars/dog.png',
      role: AnimalRoles.GUARDIAN,
      initialStock: 0,
    },
  ];

  const newHerd = new Herd(mockHerdConfig);

  console.log(JSON.parse(JSON.stringify(newHerd.theAnimals)));

  console.log(newHerd.getAnimalNumber(AnimalNames.COW));
  newHerd.addAnimalsToHerd(AnimalNames.RABBIT, 10);
  console.log(JSON.parse(JSON.stringify(newHerd.theAnimals)));
}
