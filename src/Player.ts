import { Herd } from './Herd';

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

  get theName() {
    return this.name;
  }

  get theAvatar() {
    return this.avatar;
  }

  set theAvatar(avatar: string) {
    this.avatar = avatar;
  }

  get theHerd() {
    return this.herd;
  }

  set theHerd(herd: Herd) {
    this.herd = herd;
  }

  get theScore() {
    return this.score;
  }

  updateScore() {
    // TODO: count value of all animals from herd when it's ready
    const newScore = 0;
    this.score = newScore;
  }
}
