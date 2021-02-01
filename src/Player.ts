import { Herd } from './app/logic/Herd';
import { HerdConfigInterface } from './Interfaces/HerdConfigInterface';

export class Player {
  protected name: string;
  protected avatar: string;
  protected herd: Herd;
  protected color: string;

  // TODO: set path to default avatar when it's available
  constructor(
    name: string,
    avatar = 'path to default avatar',
    color: string,
    herdConfig: HerdConfigInterface[],
  ) {
    this.name = name;
    this.herd = new Herd(herdConfig);
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
}
