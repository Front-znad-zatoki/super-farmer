// import { Fox } from '../src/Animals/Fox';
// import { Wolf } from '../src/Animals/Wolf';
import { AnimalNames } from '../src/Enums/AnimalNamesEnum';
import { Herd } from '../src/app/logic/Herd';
import { mockHerdConfig } from './mock/mockHerdConfig';
import { Predator } from '../src/Animals/Predator';
import { mockFox, mockWolf } from './mock/mockPredatorsConfig';
import { GameModes } from '../src/Enums/GameModeEnums';

describe('Herds method', () => {
  describe('addAnimal, given mock data', () => {
    const testedHerd = new Herd(mockHerdConfig);
    testedHerd.addAnimalsToHerd(AnimalNames.SHEEP, 2);
    it('should increment the number of specific animal', () => {
      expect(testedHerd.theAnimals[1][1]).toBe(2);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(mockHerdConfig);
    testedHerd.addAnimalsToHerd(AnimalNames.RABBIT, 10);
    testedHerd.cullAnimals(
      new Predator(
        mockWolf.name,
        mockWolf.path,
        undefined,
        mockWolf.kills,
        mockWolf.isChasedAwayBy,
        mockWolf.exclamation,
      ),
      GameModes.STATIC,
    );
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[0][1]).toBe(0);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(mockHerdConfig);
    testedHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 1);
    testedHerd.addAnimalsToHerd(AnimalNames.RABBIT, 10);
    testedHerd.cullAnimals(
      new Predator(
        mockFox.name,
        mockFox.path,
        mockWolf.roles,
        mockFox.kills,
        mockFox.isChasedAwayBy,
        mockFox.exclamation,
      ),
      GameModes.STATIC,
    );
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[5][1]).toBe(0);
      expect(testedHerd.theAnimals[0][1]).toBe(10);
    });
  });

  describe('cullAnimals, given mock data', () => {
    const testedHerd = new Herd(mockHerdConfig);
    testedHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 1);
    testedHerd.addAnimalsToHerd(AnimalNames.SHEEP, 10);
    testedHerd.cullAnimals(
      new Predator(
        mockWolf.name,
        mockWolf.path,
        mockWolf.roles,
        mockWolf.kills,
        mockWolf.isChasedAwayBy,
        mockWolf.exclamation,
      ),
      GameModes.STATIC,
    );
    it('should modify the number of specific animal', () => {
      expect(testedHerd.theAnimals[6][1]).toBe(0);
      expect(testedHerd.theAnimals[1][1]).toBe(10);
    });
  });

  describe('getAnimalNumber, given mock data', () => {
    const testedHerd = new Herd(mockHerdConfig);
    testedHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 1);
    testedHerd.addAnimalsToHerd(AnimalNames.RABBIT, 10);
    it('should modify the number of specific animal', () => {
      expect(testedHerd.getAnimalNumber(AnimalNames.RABBIT)).toBe(10);
      expect(testedHerd.getAnimalNumber(AnimalNames.BIG_DOG)).toBe(1);
    });
  });
});
