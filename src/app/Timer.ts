export class Timer {
  private turnTimeLeft: number;

  constructor(private maxTurnTime = 15) {
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

  resetTurn(): void {
    this.turnTimeLeft = this.maxTurnTime;
  }
}
