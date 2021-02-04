import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
import { AttackHerdInterface } from '~src/Interfaces/AttackHerdInterface';
import { Animal } from './Animal';

export class Predator extends Animal implements AttackHerdInterface {
  protected _kills: AnimalNames[];
  protected _isChasedAwayBy: AnimalNames[];
  protected _exclamation: string;
  constructor(
    name: AnimalNames,
    imagePath: string,
    roles: AnimalRoles = AnimalRoles.PREDATOR,
    kills: AnimalNames[],
    isChasedAwayBy: AnimalNames[],
    exclamation: string,
  ) {
    super(name, imagePath, undefined, roles);
    this._kills = kills;
    this._isChasedAwayBy = isChasedAwayBy;
    this._exclamation = exclamation;
  }

  get kills(): AnimalNames[] {
    return this._kills;
  }
  get isChasedAwayBy(): AnimalNames[] {
    return this._isChasedAwayBy;
  }
  get exclamation(): string {
    return this._exclamation;
  }

  attackHerd(): void {
    alert(this._exclamation);
  }
}
