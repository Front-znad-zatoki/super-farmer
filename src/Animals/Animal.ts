import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import _ from 'lodash';

type Value = 1 | 6 | 12 | 36 | 72;

export abstract class Animal {
  protected name: AnimalNames;
  protected roles: AnimalRoles[];
  protected value?: Value;

  constructor(
    name: AnimalNames,
    value?: Value,
    ...roles: AnimalRoles[]
  ) {
    this.name = name;
    this.roles = roles;
    this.value = value;
  }

  get theName(): string {
    return this.name;
  }

  get theRoles(): AnimalRoles[] {
    return this.roles;
  }

  get theValue(): Value {
    if (this.value) return this.value;
    throw new TypeError(`Value of ${this.name} is undefined`);
  }

  set theValue(value: Value) {
    this.value = value;
  }

  /**
   * @param role - one role or more to push to the roles
   * @returns new lenght of the array
   */
  addRole(...role: AnimalRoles[]): number {
    return this.roles.push(...role);
  }

  /**
   * @param role - one role or more to remove from the roles
   * @returns the array after removing elements
   */
  removeRole(...role: AnimalRoles[]): AnimalRoles[] {
    return _.pull(this.roles, ...role);
  }

  /**
   * Checks if animal has the given role and return boolean
   */
  hasRole = (role: AnimalRoles): boolean =>
    this.roles.indexOf(role) !== -1;
}
