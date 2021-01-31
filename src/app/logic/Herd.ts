import { Animal } from '../../Animals/Animal';
import { BigDog } from '../../Animals/BigDog';
import { Cow } from '../../Animals/Cow';
import { Fox } from '../../Animals/Fox';
import { Horse } from '../../Animals/Horse';
import { Pig } from '../../Animals/Pig';
import { Rabbit } from '../../Animals/Rabbit';
import { Sheep } from '../../Animals/Sheep';
import { SmallDog } from '../../Animals/SmallDog';
import { Wolf } from '../../Animals/Wolf';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';

export class Herd {
  protected animals: [Animal, number][];
  constructor(playersHerdConfig: [AnimalNames, number][]) {
    this.animals = [
      [new Rabbit(), 0],
      [new Sheep(), 0],
      [new Pig(), 0],
      [new Cow(), 0],
      [new Horse(), 0],
      [new SmallDog(), 0],
      [new BigDog(), 0],
    ];
    console.log(playersHerdConfig);
  }

  addAnimals(animalName: AnimalNames, numberToAdd: number): Herd {
    this.animals = this.animals.map((animalData) => {
      const name = animalData[0].theName;
      if (name === animalName) {
        animalData[1] += numberToAdd;
      }
      return animalData;
    });
    return this;
  }

  get theAnimals(): [Animal, number][] {
    return this.animals;
  }

  getAnimalNumber(animalName: AnimalNames): number {
    const animalToCheck = this.animals.find((animalData) => {
      return animalData[0].theName === animalName;
    });
    if (!animalToCheck) return 0;
    return animalToCheck[1];
  }

  private cullAllAnimalsOfOneType(animalName: AnimalNames): void {
    const currentNumberOfAnimals = this.getAnimalNumber(animalName);
    this.addAnimals(animalName, -currentNumberOfAnimals);
  }

  private cullAllAnimalsOfGivenTypes(
    animalNames: AnimalNames[],
  ): void {
    animalNames.forEach((animal) => {
      this.cullAllAnimalsOfOneType(animal);
    });
  }

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
        this.addAnimals(AnimalNames.SMALL_DOG, -1);
        (this.animals[5][0] as SmallDog).protectHerd();
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
        this.addAnimals(AnimalNames.BIG_DOG, -1);
        (this.animals[6][0] as BigDog).protectHerd();
      }
    }
  }
}
