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
//TODO: MERGE CORRECT TESTS AFTER HERD IS MERGED
describe('Herds method', () => {
  describe('addAnimal, given mock data', () => {
    const testedHerd = 1;
    it('should increment the number of specific animal', () => {
      expect(testedHerd).toBe(1);
    });
  });
});
