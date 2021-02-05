export class Timer {
  private turnTimeLeft: number;
  private isRunning = false;
  private gameEnded = true;
  private gamePaused = false;

  constructor(private maxTurnTime = 15) {
    this.turnTimeLeft = this.maxTurnTime;
  }

  get theTurnTimeLeft(): number {
    return this.turnTimeLeft;
  }

  get hasGameEnded(): boolean {
    return this.gameEnded;
  }

  get running(): boolean {
    return this.isRunning;
  }

  countdown(): void {
    this.gameEnded = false;
    this.isRunning = true;
    const countdownInterval = setInterval(() => {
      if (Math.ceil(this.theTurnTimeLeft) === 0 || !this.isRunning) {
        clearInterval(countdownInterval);
        this.isRunning = false;
      }
      if (!this.gamePaused) {
        this.reduceTime();
      }
    }, 10);
  }

  reduceTime(): void {
    this.turnTimeLeft -= 0.01;
  }

  pauseTime(): void {
    this.gamePaused = true;
  }

  resumeTime(): void {
    this.gamePaused = false;
  }

  resetTurn(): void {
    this.isRunning = false;
    this.turnTimeLeft = this.maxTurnTime;
  }

  quitGame(): void {
    this.gameEnded = true;
  }
}
