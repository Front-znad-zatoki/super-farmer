import { defaultPlayerHerdConfig } from './app/logic/defaultHerdConfig';
import { Herd } from './app/logic/Herd';
// import { mockHerdConfig } from './app/logic/defaultHerdConfig';
import { HerdConfigInterface } from './Interfaces/HerdConfigInterface';

export class Player {
  protected name: string;
  protected avatar: string;
  protected herd: Herd;
  protected color: string;

  constructor(
    name: string,
    avatar = 'path to default avatar',
    color = 'green',
    herdConfig: HerdConfigInterface[] = defaultPlayerHerdConfig,
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

  get theColor(): string {
    return this.color;
  }

  set theColor(color: string) {
    this.color = color;
  }
}
