import { Calculator } from '../src/app/Calculator';

describe('should test', () => {
  it('should add numbers', () => {
    const calc = new Calculator();
    const actualResult = calc.add(4, 5);
    const expectedResult = 4 + 5;
    expect(actualResult).toBe(expectedResult);
  });
});
