import { Fox } from "../../../build/dist/src.f10117fe";

class Herd {
  protected animals: [Animal, number][];
  //OR protected rabbit: [new Rabbit(), number]
  constructor(
    numberOfRabbits: number,
    numberOfSheep: number,
    numberOfPigs: number,
    numberOfCows: number,
    numberOfHorses: number,
    numberOfSmallDogs: number,
    numberOfBigDogs: number,
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

  addAnimals(animalName: AnimalNames, numberToAdd: number): void {
    //TODO REFACTOR CODE
    this.animals.map((animalData) => {
      const { name } = animalData[0];
      if (name === animalName) {
        animalData[1] += numberToAdd;
      }
    });
  }

  get theAnimals() {
    return this.animals;
  }
  get animalData(animalName: AnimalNames): [Animal, number] {
    // TODO get the tuple with data
    // return [Animal, number]
  }

  get animalNumber(animalName: AnimalNames): number {
    //TODO REFACTOR CODE
    const animalToCheck = this.animals.find((animalData) => {
      animalData[0].name === animalName;
    });
    // if (!animalToCheck) throw new Error ('no such animal in this herd')
    if (!animalToCheck) return 0;
    return animalToCheck[1];
  }

  cullAnimals(attackingAnimal: Fox | Wolf): void {
    //TODO REFACTOR CODE
    switch (attackingAnimal.name) {
      //TODO CHECK IF PASSED ANIMAL IS AN OBJECT, ADJUST CASES ACCORDINGLY (EX.: CASE )
      case 'fox': {
        const smallDogData = this.animals.find((animalData) => {
          animalData[0].name === 'smallDog';
        });
        if (!smallDogData || smallDogData[1] < 1) {
          Fox.clearHerd();
          // TODO - get the rabbits in animals and change to zero
          // return;
        }
        this.addAnimals('smallDog', -1);
        // TODO - get the small dog object from animals and fire the method protect herd
        break;
      }
      case 'wolf': {
        const bigDogsData = this.animals.find((animalData) => {
          animalData[0].name === 'bigDog';
        });
        if (!bigDogsData || bigDogsData[1] < 1) {
          Wolf.clearHerd();
          // TODO - get all the animals in animals and change to zero except for horse
          // return;
        }
        this.addAnimals('smallDog', -1);
        // TODO - get the big dog object from animals and fire the method protect herd
      }
    }
  }
}
