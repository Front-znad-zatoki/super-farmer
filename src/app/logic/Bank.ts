import { HerdConfigInterface } from '~src/Interfaces/HerdConfigInterface';
import { Player } from '../../Player';

export class Bank extends Player {
  constructor(banksHerdConfig: HerdConfigInterface[]) {
    super('bank', '', '', banksHerdConfig);
    // TO BE DIFNED BY GAME'S CONFIG:
    // this.herd = new Herd(60, 24, 20, 12, 4, 4, 2);
  }
}
