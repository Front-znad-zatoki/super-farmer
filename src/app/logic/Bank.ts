import { Value } from '../../Animals/Animal';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';
import { Player } from '../../Player';
// import { Herd } from './Herd';

export class Bank extends Player {
  constructor(
    banksHerdConfig: {
      name: AnimalNames;
      tradeValue: Value;
      role: AnimalRoles;
      path: string;
      initialStock: number;
    }[],
  ) {
    super('bank', '', banksHerdConfig);
    // TO BE DIFNED BY GAME'S CONFIG:
    // this.herd = new Herd(60, 24, 20, 12, 4, 4, 2);
  }
}
