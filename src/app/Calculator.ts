import _ from 'lodash';

export class Calculator {
  a: number;

  constructor() {
    this.a = 0;
  }
  add(a: number, b: number): number {
    return _.add(a, b);
  }

  set theA(a: number) {
    this.a = a;
  }

  get theA(): number {
    return this.a;
  }
}
