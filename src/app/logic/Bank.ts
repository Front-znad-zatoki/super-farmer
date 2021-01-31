import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Player } from '../../Player';
// import { Herd } from './Herd';

export class Bank extends Player {
  constructor(banksHerdConfig: [AnimalNames, number][]) {
    super('Bank', '', 'green', banksHerdConfig);
    // TODO: DELETE HERD AFTER REFACTOR CONFIRMED
    // this.herd = new Herd(60, 24, 20, 12, 4, 4, 2);
  }
}
