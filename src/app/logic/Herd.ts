import _ from 'lodash';
import { AnimalRoles } from '~src/Enums/AnimalRolesEnum';
import { Animal, Value } from '../../Animals/Animal';
import { BigDog } from '../../Animals/BigDog';
// import { Cow } from '../../Animals/Cow';
import { Fox } from '../../Animals/Fox';
// import { Horse } from '../../Animals/Horse';
// import { Pig } from '../../Animals/Pig';
// import { Rabbit } from '../../Animals/Rabbit';
// import { Sheep } from '../../Animals/Sheep';
import { SmallDog } from '../../Animals/SmallDog';
import { Wolf } from '../../Animals/Wolf';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';

export class Herd {
  protected animals: [Animal, number][];
  constructor(
    playersHerdConfig: {
      name: AnimalNames;
      tradeValue: Value;
      role: AnimalRoles;
      path: string;
      initialStock: number;
    }[],
  ) {
    this.animals = playersHerdConfig.map(
      ({ name, tradeValue, role, path, initialStock }) => {
        // TODO: ADD PATH TO ANIMAL IMAGE, VALUE, ROLE IN CONFIG -> CHANGE IN GAME
        const newAnimal = new Animal(name, path, tradeValue, role);
        return [newAnimal, initialStock];
      },
    );
  }
  // TODO: ADD METHOD DESCRIPTION
  private findAnimalIndex(animalName: AnimalNames): number {
    const indexOfAnimal = this.animals.findIndex((animal) => {
      if (animal[0].theName === animalName) return true;
    });
    if (indexOfAnimal === -1)
      throw new Error(`Animal: ${animalName} not found`);
    return indexOfAnimal;
  }
  // TODO: ADD METHOD DESCRIPTION
  private addAnimalNumbers(
    currentNumber: number,
    numberToAdd: number,
  ): number {
    return _.add(currentNumber, numberToAdd);
  }
  // TODO: ADD METHOD DESCRIPTION
  private substractAnimalNumbers(
    currentNumber: number,
    numberToSubstract: number,
  ): number {
    return _.subtract(currentNumber, numberToSubstract);
  }
  // TODO: ADD METHOD DESCRIPTION
  private updateNumberOfAnimals(
    index: number,
    newNumberOfAnimals: number,
  ): void {
    this.animals[index][1] = newNumberOfAnimals;
  }
  // TODO: ADD METHOD DESCRIPTION
  addAnimalsToHerd(
    animalName: AnimalNames,
    numberToAdd: number,
  ): void {
    const animalIndex = this.findAnimalIndex(animalName);
    const animalTuple = this.animals[animalIndex];
    const newNumber = this.addAnimalNumbers(
      animalTuple[1],
      numberToAdd,
    );
    this.updateNumberOfAnimals(animalIndex, newNumber);
  }
  // TODO: ADD METHOD DESCRIPTION
  removeAnimalsFromHerd(
    animalName: AnimalNames,
    numberToSubstract: number,
  ): void {
    const animalIndex = this.findAnimalIndex(animalName);
    const animalTuple = this.animals[animalIndex];
    const newNumber = this.substractAnimalNumbers(
      animalTuple[1],
      numberToSubstract,
    );
    this.updateNumberOfAnimals(animalIndex, newNumber);
  }
  // TODO: ADD METHOD DESCRIPTION
  get theAnimals(): [Animal, number][] {
    return this.animals;
  }
  // TODO: ADD METHOD DESCRIPTION
  getAnimalNumber(animalName: AnimalNames): number {
    const animalToCheck = this.animals[
      this.findAnimalIndex(animalName)
    ];
    return animalToCheck[1];
  }
  // TODO: ADD METHOD DESCRIPTION
  private cullAllAnimalsOfOneType(animalName: AnimalNames): void {
    const indexOfAnimalTuple = this.findAnimalIndex(animalName);
    this.animals[indexOfAnimalTuple][1] = 0;
  }
  // TODO: ADD METHOD DESCRIPTION
  private cullAllAnimalsOfGivenTypes(
    animalNames: AnimalNames[],
  ): void {
    animalNames.forEach((animal) => {
      this.cullAllAnimalsOfOneType(animal);
    });
  }
  // TODO: ADD METHOD DESCRIPTION
  // TODO: Check parameteres type
  // TODO: Modify to use config
  cullAnimals(attackingAnimal: Fox | Wolf): void {
    switch (attackingAnimal.theName) {
      case AnimalNames.FOX: {
        const hasSmallDog =
          this.getAnimalNumber(AnimalNames.SMALL_DOG) > 0;
        if (!hasSmallDog) {
          attackingAnimal.attackHerd();
          this.cullAllAnimalsOfOneType(AnimalNames.RABBIT);
          return;
        }
        this.removeAnimalsFromHerd(AnimalNames.SMALL_DOG, 1);
        // (this.animals[5][0] as SmallDog).protectHerd();
        break;
      }
      case AnimalNames.WOLF: {
        const hasBigDog =
          this.getAnimalNumber(AnimalNames.BIG_DOG) > 0;
        if (!hasBigDog) {
          attackingAnimal.attackHerd();
          this.cullAllAnimalsOfGivenTypes([
            AnimalNames.COW,
            AnimalNames.PIG,
            AnimalNames.RABBIT,
            AnimalNames.SHEEP,
          ]);
          return;
        }
        this.removeAnimalsFromHerd(AnimalNames.BIG_DOG, 1);
        // (this.animals[6][0] as BigDog).protectHerd();
      }
    }
  }
}
