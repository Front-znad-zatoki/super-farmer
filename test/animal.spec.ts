import { Animal } from '../src/Animals/Animal';
import { AnimalNames } from '../src/Enums/AnimalNamesEnum';
import { AnimalRoles } from '../src/Enums/AnimalRolesEnum';

class DummyAnimal extends Animal {}

describe('addRole', () => {
  it('should push new element to the array', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );

    dummyAnimal.addRole(AnimalRoles.GUARDIAN);
    const actualResult = dummyAnimal.theRoles;
    const expectedResult = [
      AnimalRoles.LIVESTOCK,
      AnimalRoles.GUARDIAN,
    ];
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('should push new elements to the array', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );

    dummyAnimal.addRole(AnimalRoles.GUARDIAN, AnimalRoles.PREDATOR);
    const actualResult = dummyAnimal.theRoles;
    const expectedResult = [
      AnimalRoles.LIVESTOCK,
      AnimalRoles.GUARDIAN,
      AnimalRoles.PREDATOR,
    ];
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('should return new length of array', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );
    const actualResult = dummyAnimal.addRole(AnimalRoles.GUARDIAN);
    const expectedResult = 2;
    expect(actualResult).toBe(expectedResult);
  });
});

describe('removeRole', () => {
  it('should remove given element from the array', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );

    dummyAnimal.removeRole(AnimalRoles.LIVESTOCK);
    const actualResult = dummyAnimal.theRoles;
    const expectedResult: AnimalRoles[] = [];
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('should remove given elements from the array', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
      AnimalRoles.PREDATOR,
    );

    dummyAnimal.removeRole(
      AnimalRoles.LIVESTOCK,
      AnimalRoles.PREDATOR,
    );
    const actualResult = dummyAnimal.theRoles;
    const expectedResult: AnimalRoles[] = [];
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it('should return array after removing', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );
    const actualResult = dummyAnimal.removeRole(
      AnimalRoles.LIVESTOCK,
    );
    const expectedResult: AnimalRoles[] = [];
    expect(actualResult).toStrictEqual(expectedResult);
  });
});

describe('hasRole', () => {
  it('should return true', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );

    const actualResult = dummyAnimal.hasRole(AnimalRoles.LIVESTOCK);
    const expectedResult = true;
    expect(actualResult).toBe(expectedResult);
  });

  it('should return false', () => {
    const dummyAnimal = new DummyAnimal(
      AnimalNames.PIG,
      undefined,
      undefined,
      AnimalRoles.LIVESTOCK,
    );

    const actualResult = dummyAnimal.hasRole(AnimalRoles.GUARDIAN);
    const expectedResult = false;
    expect(actualResult).toBe(expectedResult);
  });
});
