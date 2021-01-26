import { Herd } from './app/logic/Herd';

export class Player {
  protected name: string;
  protected avatar: string;
  protected herd: Herd;
  protected score: number;

  // TODO: set path to default avatar when it's available
  constructor(name: string, avatar = 'path to default avatar') {
    this.name = name;
    this.herd = new Herd();
    this.avatar = avatar;
    this.score = 0;
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

  get theScore(): number {
    return this.score;
  }

  updateScore(): void {
    // TODO: count value of all animals from herd when it's ready
    const newScore = 0;
    this.score = newScore;
  }
}
