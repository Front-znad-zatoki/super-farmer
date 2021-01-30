import { Player } from '~src/Player';
import { Herd } from './Herd';

export class Bank extends Player {
  constructor() {
    super('Bank');
    this.herd = new Herd(60, 24, 20, 12, 4, 4, 2);
  }
}
