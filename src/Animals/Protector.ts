import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal, Value } from './Animal';

export class Protector
  extends Animal
  implements ProtectHerdInterface {
  protected _chasesAway: AnimalNames;
  protected _exclamation: string;
  constructor(
    name: AnimalNames,
    imagePath: string,
    role: AnimalRoles = AnimalRoles.PREDATOR,
    value: Value,
    chasesAway: AnimalNames,
    exclamation: string,
  ) {
    super(name, imagePath, value, role);
    this._chasesAway = chasesAway;
    this._exclamation = exclamation;
  }

  get chasesAway(): AnimalNames {
    if (!this._chasesAway) throw new Error('nothing to chase away');
    return this._chasesAway;
  }
  get exclamation(): string {
    if (!this._exclamation) return '';
    return this._exclamation;
  }

  protectHerd(): string {
    if (!this._exclamation) return '';
    return this._exclamation;
  }
}
