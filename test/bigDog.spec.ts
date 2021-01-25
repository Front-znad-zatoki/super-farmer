import { BigDog } from '../src/Animals/BigDog';

const bigDog = new BigDog();

describe('should return proper string', function () {
  it('should pass', function () {
    expect(bigDog.protectHerd()).toBe(
      `${bigDog.theName}: WOOF! WOOF! I'm protecting the whole herd! WOOF! WOOF!`,
    );
  });
});
