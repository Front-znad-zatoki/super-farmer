import { Wolf } from '../src/Animals/Wolf';

const wolf = new Wolf();

describe('should return proper string', function () {
  it('should pass', function () {
    expect(wolf.attackHerd()).toBe(
      `${wolf.theName}: Auuuuuu! I ate all animals in the herd except horses and small dog. Grrrrr!`,
    );
  });
});
