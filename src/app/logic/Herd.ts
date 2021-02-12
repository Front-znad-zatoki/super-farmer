import { add, subtract } from 'lodash';
import { Predator } from '../../Animals/Predator';
import { Animal } from '../../Animals/Animal';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { HerdConfigInterface } from '../../Interfaces/HerdConfigInterface';
import { GameModes } from '../../Enums/GameModeEnums';
import { Protector } from '../../Animals/Protector';
import { AnimalRoles } from '../../Enums/AnimalRolesEnum';
export class Herd {
  protected animals: [Animal, number][];
  constructor(playersHerdConfig: HerdConfigInterface[]) {
    this.animals = playersHerdConfig.map(
      ({
        name,
        tradeValue,
        role,
        path,
        inStock,
        chasesAway,
        exclamation,
      }) => {
        if (role === AnimalRoles.GUARDIAN) {
          if (chasesAway && exclamation) {
            const newAnimal = new Protector(
              name,
              path,
              role,
              tradeValue,
              chasesAway,
              exclamation,
            );
            console.log(newAnimal);
            return [newAnimal, inStock];
          }
        }
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
      console.log(`Animal: ${animalName} not found`);
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
    const newNumber = add(animalTuple[1], numberToAdd);
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
    if (animalTuple[1] < numberToSubstract)
      console.log('not enough animals: ', animalName);
    const newNumber = subtract(animalTuple[1], numberToSubstract);
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
   * @param { Predator } attackingAnimal The animal that is attacking the herd.
   */
  cullAnimals(attackingAnimal: Predator, mode: GameModes): void {
    const animalsToCull = attackingAnimal.kills;
    const protector = attackingAnimal.isChasedAwayBy;
    const hasProtector = this.getAnimalNumber(protector) > 0;
    if (!hasProtector) {
      const isDynamicMode = mode === GameModes.DYNAMIC;
      const killsRabbits = animalsToCull.includes(AnimalNames.RABBIT);
      this.cullAllAnimalsOfGivenTypes(animalsToCull);
      if (isDynamicMode && killsRabbits) {
        this.addAnimalsToHerd(AnimalNames.RABBIT, 1);
      }
      attackingAnimal.attackHerd();
    } else {
      this.removeAnimalsFromHerd(protector, 1);
      const protectorsIndex = this.findAnimalTupleIndex(protector);
      const protectorsObject = this.theAnimals[protectorsIndex][0];
      if (protectorsObject instanceof Protector)
        protectorsObject.protectHerd();
    }
  }
}
