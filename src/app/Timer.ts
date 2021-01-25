export class Timer {
  private maxTurnTime: number;
  private turnTimeLeft: number;

  constructor(turnTime = 15) {
    this.maxTurnTime = turnTime;
    this.turnTimeLeft = this.maxTurnTime;
  }

  get theTurnTimeLeft(): number {
    return this.turnTimeLeft;
  }

  countdown(): void {
    const countdownInterval = setInterval(() => {
      this.reduceTime();
      if (this.theTurnTimeLeft === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  reduceTime(): void {
    this.turnTimeLeft -= 1;
  }
}
