import { Animal } from '../src/Animals/Animal';
import { BigDog } from '../src/Animals/BigDog';
import { Cow } from '../src/Animals/Cow';
import { Fox } from '../src/Animals/Fox';
import { Horse } from '../src/Animals/Horse';
import { Pig } from '../src/Animals/Pig';
import { Rabbit } from '../src/Animals/Rabbit';
import { Sheep } from '../src/Animals/Sheep';
import { SmallDog } from '../src/Animals/SmallDog';
import { Wolf } from '../src/Animals/Wolf';
import { AnimalNames } from '../src/Enums/AnimalNamesEnum';
import { Herd } from '../src/app/logic/Herd';

describe('Herds method', () => {
  describe('addAnimal, given mock data', () => {
    const testedHerd = new Herd();
    testedHerd.addAnimals(AnimalNames.SHEEP, 2);
    it('should increment the number of specific animal', () => {
      expect(testedHerd.theAnimals[1][1]).toBe(2);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(10, 10, 10, 10, 10);
    testedHerd.cullAnimals(new Fox());
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[0][1]).toBe(0);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(10, 10, 10, 10, 10, 1, 1);
    testedHerd.cullAnimals(new Fox());
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[5][1]).toBe(0);
      expect(testedHerd.theAnimals[0][1]).toBe(10);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(10, 10, 10, 10, 10, 1, 1);
    testedHerd.cullAnimals(new Wolf());
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[6][1]).toBe(0);
      expect(testedHerd.theAnimals[1][1]).toBe(10);
    });
  });

  describe('getAnimalNumber, given mock data', () => {
    const testedHerd = new Herd(10, 10, 10, 10, 10, 1, 1);
    it('should modify the number of specific animal', () => {
      expect(testedHerd.getAnimalNumber(AnimalNames.RABBIT)).toBe(10);
      expect(testedHerd.getAnimalNumber(AnimalNames.BIG_DOG)).toBe(1);
    });
  });
});