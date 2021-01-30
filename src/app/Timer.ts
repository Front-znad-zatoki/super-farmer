export class Timer {
  private turnTimeLeft: number;
  private isRunning = false;

  constructor(private maxTurnTime = 15) {
    this.turnTimeLeft = this.maxTurnTime;
  }

  get theTurnTimeLeft(): number {
    return this.turnTimeLeft;
  }

  get running(): boolean {
    return this.isRunning;
  }

  countdown(): void {
    this.isRunning = true;
    const countdownInterval = setInterval(() => {
      if (Math.ceil(this.theTurnTimeLeft) === 0 || !this.isRunning) {
        clearInterval(countdownInterval);
        this.isRunning = false;
      }
      this.reduceTime();
    }, 10);
  }

  reduceTime(): void {
    this.turnTimeLeft -= 0.01;
  }

  resetTurn(): void {
    this.isRunning = false;
    this.turnTimeLeft = this.maxTurnTime;
  }
}
