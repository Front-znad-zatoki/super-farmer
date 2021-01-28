export class Timer {
  private turnTimeLeft: number;
  private isRunning = false;

  constructor(private maxTurnTime = 15) {
    this.turnTimeLeft = this.maxTurnTime;
  }

  get theTurnTimeLeft(): number {
    return this.turnTimeLeft;
  }

  countdown(): void {
    this.isRunning = true;
    const countdownInterval = setInterval(() => {
      this.reduceTime();
      if (this.theTurnTimeLeft === 0 || !this.isRunning) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  reduceTime(): void {
    this.turnTimeLeft -= 1;
  }

  resetTurn(): void {
    this.turnTimeLeft = this.maxTurnTime;
    this.isRunning = false;
  }
}
