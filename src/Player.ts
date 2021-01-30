import { Herd } from './app/logic/Herd';

export class Player {
  protected name: string;
  protected avatar: string;
  protected herd: Herd;

  // TODO: set path to default avatar when it's available
  constructor(name: string, avatar = 'path to default avatar') {
    this.name = name;
    this.herd = new Herd();
    this.avatar = avatar;
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
