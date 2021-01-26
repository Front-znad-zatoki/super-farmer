import { SmallDog } from '../src/Animals/SmallDog';

const smallDog = new SmallDog();

describe('should return proper string', function () {
  it('should pass', function () {
    expect(smallDog.protectHerd()).toBe(
      `${smallDog.theName}: Woof! Woof! I'm protecting all rabbits in the herd! Woof! Woof!`,
    );
  });
});
