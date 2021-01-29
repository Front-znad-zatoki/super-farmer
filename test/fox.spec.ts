import { Fox } from '../src/Animals/Fox';

const fox = new Fox();

describe('should return proper string', function () {
  it('should pass', function () {
    expect(fox.attackHerd()).toBe(
      `${fox.theName}: Ring-ding-ding-ding-dingeringeding! I ate all rabbits in the herd. Wa-pa-pa-pa-pa-pa-pow!`,
    );
  });
});
