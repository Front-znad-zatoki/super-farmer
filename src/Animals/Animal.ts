import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import _ from 'lodash';

export abstract class Animal {
  protected name: AnimalNames;
  protected roles: AnimalRoles[];
  protected value?: number;

  constructor(
    name: AnimalNames,
    value?: number,
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

  get theValue(): number {
    if (this.value) return this.value;
    throw new TypeError(`Value of ${this.name} is undefined`);
  }

  set theValue(value: number) {
    this.value = value;
  }
}
