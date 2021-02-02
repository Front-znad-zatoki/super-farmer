import _ from 'lodash';
import { Animal } from '../../Animals/Animal';
import { Fox } from '../../Animals/Fox';
import { Wolf } from '../../Animals/Wolf';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { mockHerdConfig } from './mockHerdConfig';

export class Herd {
  protected animals: [Animal, number][];
  constructor(
    playersHerdConfig: HerdConfigInterface[] = mockHerdConfig,
  ) {
    this.animals = playersHerdConfig.map(
      ({ name, tradeValue, role, path, inStock }) => {
        const newAnimal = new Animal(name, path, tradeValue, role);
        return [newAnimal, inStock];
      },
    );
  }
  /**
   * Finds the index of the tuple with given animal's name.
   * @param {AnimalNames} animalName The animal name to search in animals tuples array.
   * @return {number} The index of the tuple with searched animal.
   */
  private findAnimalTupleIndex(animalName: AnimalNames): number {
    const indexOfAnimal = this.animals.findIndex(([animal]) => {
      if (animal.theName === animalName) return true;
    });
    if (indexOfAnimal === -1)
      throw new Error(`Animal: ${animalName} not found`);
    return indexOfAnimal;
  }

  /**
   * Updates the number of animals in the herd.
   * @param {number} indexOfTupleAnimal Current number of animals in the herd.
   * @param {number} newNumberOfAnimals Number to be the new number of animals in the herd.
   */
  private updateNumberOfAnimals(
    indexOfTupleAnimal: number,
    newNumberOfAnimals: number,
  ): void {
    this.animals[indexOfTupleAnimal][1] = newNumberOfAnimals;
  }

  /**
   * Finds the index of the chosen animals tuple, adds the number of the animals in the herd
   * to the incoming number of animals, updates the number in animals tuple array.
   * updates the number of animals in the herd.
   * @param {AnimalNames} animalName Name of the animal to be updated.
   * @param {number} numberToAdd Number to add to the number of animals in the herd.
   */
  addAnimalsToHerd(
    animalName: AnimalNames,
    numberToAdd: number,
  ): void {
    const animalIndex = this.findAnimalTupleIndex(animalName);
    const animalTuple = this.animals[animalIndex];
    const newNumber = _.add(animalTuple[1], numberToAdd);
    this.updateNumberOfAnimals(animalIndex, newNumber);
  }

  /**
   * Finds the index of the chosen animals tuple, substracts the given number of the animals from
   * the number of animals in the herd, updates the number in animals tuple array.
   * updates the number of animals in the herd.
   * @param {number} animalName Name of the animal to be updated.
   * @param {number} numberToSubstract Number to substract from the number of animals in the herd.
   */
  removeAnimalsFromHerd(
    animalName: AnimalNames,
    numberToSubstract: number,
  ): void {
    const animalIndex = this.findAnimalTupleIndex(animalName);
    const animalTuple = this.animals[animalIndex];
    const newNumber = _.subtract(animalTuple[1], numberToSubstract);
    this.updateNumberOfAnimals(animalIndex, newNumber);
  }

  /**
   * Returns the object's array of animals tuples.
   * @return {[Animal, number][]} Array of animals tuples in herd.
   */
  get theAnimals(): [Animal, number][] {
    return this.animals;
  }

  /**
   * Gets the number of the animals in the herd with given name.
   * @param {AnimalNames} animalName The animal name to search.
   * @return {number} The current number of animals of this name in the herd.
   */
  getAnimalNumber(animalName: AnimalNames): number {
    const animalToCheck = this.animals[
      this.findAnimalTupleIndex(animalName)
    ];
    return animalToCheck[1];
  }

  /**
   * Reduces to zero the number of the animals in the herd with given name.
   * @param {AnimalNames} animalName The animal name to search and to be culled.
   */
  private cullAllAnimalsOfOneType(animalName: AnimalNames): void {
    const indexOfAnimalTuple = this.findAnimalTupleIndex(animalName);
    this.animals[indexOfAnimalTuple][1] = 0;
  }

  /**
   * Reduces to zero the number of the animals in the herd with given names.
   * @param {AnimalNames[]} animalName The animal's names array to search and to be culled.
   */
  private cullAllAnimalsOfGivenTypes(
    animalNames: AnimalNames[],
  ): void {
    animalNames.forEach((animal) => {
      this.cullAllAnimalsOfOneType(animal);
    });
  }

  /**
   * Depending on the attacking animal, it checks if there is a herd protector for the given type of attacker,
   * then reduces to zero the number of the animals in the herd or removes the protector, as is defined by game configuration.
   * @param { Fox | Wolf } attackingAnimal The animal that is attacking the herd.
   */
  // TODO: Check parameteres type. Create classes for protectors and predators if needed.
  // TODO: Modify to use config? Define at refactor
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
