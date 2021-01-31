import { Herd } from './app/logic/Herd';
import { AnimalNames } from './Enums/AnimalNamesEnum';
// import { AnimalRoles } from './Enums/AnimalRolesEnum';

export class Player {
  protected name: string;
  protected avatar: string;
  protected herd: Herd;
  protected color: string;

  // TODO: set path to default avatar when it's available
  // TODO: DECIDE HOW THE COLORS SHOULD BE CHOSEN, DEFAULT ALSO

  constructor(
    name: string,
    avatar = 'path to default avatar',
    color = 'bada55',
    playerHerdConfig: [AnimalNames, number][],
  ) {
    this.name = name;
    this.herd = new Herd(playerHerdConfig);
    this.avatar = avatar;
    this.color = color;
  }

  get theName(): string {
    return this.name;
  }

  get theAvatar(): string {
    return this.avatar;
  }

  set theAvatar(avatar: string) {
    this.avatar = avatar;
  }

  get theHerd(): Herd {
    return this.herd;
  }

  set theHerd(herd: Herd) {
    this.herd = herd;
  }

  get theColor(): string {
    return this.color;
  }

  set theColor(color: string) {
    this.color = color;
  }
}
