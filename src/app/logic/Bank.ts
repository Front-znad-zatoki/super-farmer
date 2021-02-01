import { HerdConfigInterface } from '../../src/Interfaces/HerdConfigInterface';
import { Player } from '../../Player';
import { defaultBankConfig } from './defaultBankConfig';

export class Bank extends Player {
  constructor(
    banksHerdConfig: HerdConfigInterface[] = defaultBankConfig,
  ) {
    super('bank', '', '', banksHerdConfig);
  }
}
