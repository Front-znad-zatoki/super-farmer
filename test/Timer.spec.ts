import { Timer } from '../src/app/Timer';

jest.useFakeTimers();

describe('Test timer class', () => {
  it('Should start interval with 1sec delay', () => {
    const timer = new Timer(1);
    timer.countdown();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      10,
    );
  });

  it('Should reduce time left by 1', () => {
    const timer = new Timer(5);
    timer.reduceTime();
    expect(timer.theTurnTimeLeft).toBe(4.99);
  });

  it('Should reset turn time on trigger', () => {
    const turnTimer = 5;
    const timer = new Timer(turnTimer);
    timer.reduceTime();
    timer.reduceTime();
    timer.resetTurn();
    expect(timer.theTurnTimeLeft).toBe(turnTimer);
  });
});
