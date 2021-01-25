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
  // protected animals: [
  protected animals: [Animal, number][];
  // [Rabbit, number],
  // [Sheep, number],
  // [Pig, number],
  // [Cow, number],
  // [Horse, number],
  // [SmallDog, number],
  // [BigDog, number],
  // ];
  //OR protected rabbit: [new Rabbit(), number]
  //OR new Map()?
  constructor(
    numberOfRabbits = 0,
    numberOfSheep = 0,
    numberOfPigs = 0,
    numberOfCows = 0,
    numberOfHorses = 0,
    numberOfSmallDogs = 0,
    numberOfBigDogs = 0,
  ) {
    this.animals = [
      [new Rabbit(), numberOfRabbits],
      [new Sheep(), numberOfSheep],
      [new Pig(), numberOfPigs],
      [new Cow(), numberOfCows],
      [new Horse(), numberOfHorses],
      [new SmallDog(), numberOfSmallDogs],
      [new BigDog(), numberOfBigDogs],
    ];
  }

  addAnimals(animalName: AnimalNames, numberToAdd: number): Herd {
    //TODO REFACTOR CODE
    this.animals = this.animals.map((animalData) => {
      // const { name } = animalData[0]; // name protected
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
    //TODO REFACTOR CODE
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
    //TODO REFACTOR CODE
    switch (attackingAnimal.theName) {
      //TODO CHECK IF PASSED ANIMAL IS AN OBJECT, ADJUST CASES ACCORDINGLY (EX.: CASE )
      case AnimalNames.FOX: {
        const hasSmallDog =
          this.getAnimalNumber(AnimalNames.SMALL_DOG) > 0;
        if (!hasSmallDog) {
          attackingAnimal.attackHerd();
          // TODO - get the rabbits in animals and change to zero
          this.cullAllAnimalsOfOneType(AnimalNames.RABBIT);
          return;
        }
        this.addAnimals(AnimalNames.SMALL_DOG, -1);
        // this.animals[5][0].protectHerd();

        break;
      }
      case AnimalNames.WOLF: {
        const hasBigDog =
          this.getAnimalNumber(AnimalNames.BIG_DOG) > 0;
        if (!hasBigDog) {
          attackingAnimal.attackHerd();
          // TODO - REFACTOR get all the animals in animals and change to zero except for horse
          this.cullAllAnimalsOfGivenTypes([
            AnimalNames.COW,
            AnimalNames.PIG,
            AnimalNames.RABBIT,
            AnimalNames.SHEEP,
          ]);
          return;
        }
        this.addAnimals(AnimalNames.BIG_DOG, -1);
        // TODO - REFACTOR get the big dog object from animals and fire the method protect herd (WOOOOOF WOOOOOF)
        // this.animals[6][0].protectHerd();
      }
    }
  }
}
