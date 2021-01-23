export abstract class Animal {
  constructor(protected name: string, protected value?: number) {}

  get theName(): string {
    return this.name;
  }

  get theValue(): number {
    if (this.value) return this.value;
    throw new TypeError(`Value of ${this.name} is undefined`);
  }

  set theValue(value: number) {
    this.value = value;
  }
}
