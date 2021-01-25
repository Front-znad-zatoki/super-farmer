import { Timer } from '../src/app/Timer';

jest.useFakeTimers();

describe('Test timer class', () => {
  it('Should start interval with 1sec delay', () => {
    const timer = new Timer(1);
    timer.countdown();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      1000,
    );
  });

  it('Should reduce time left by 1', () => {
    const timer = new Timer(5);
    timer.reduceTime();
    expect(timer.theTurnTimeLeft).toBe(4);
  });
});
