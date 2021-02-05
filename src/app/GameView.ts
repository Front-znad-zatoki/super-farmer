import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { BankBoard } from './components/BankBoard';
import { PlayerPanel } from './components/PlayerPanel';
import { PlayersBoard } from './components/PlayersBoard';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class GameView {
  private playerPanel: PlayerPanel;

  constructor(private view: ViewController) {
    this.playerPanel = new PlayerPanel(this);
  }

  renderGameView(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ): void {
    const playersBoards = this.createPlayersBoards(players);
    const playerPanel = this.createPlayerPanel(currentPlayer);
    const endGameButton = this.createEndGameButton();
    const bankPanel = this.createBankPanel(bank);
    Render.removeAllChildren('#sf-app');
    this.setBackground(currentPlayer);
    Render.render(
      '#sf-app',
      playersBoards,
      playerPanel,
      Render.elementFactory(
        'div',
        { style: 'height: 3rem;' },
        endGameButton,
        bankPanel,
      ),
    );
  }

  private createPlayersBoards(players: Player[]): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'player-boards__container' },
      ...players.map((player) =>
        Render.elementFactory(
          'div',
          {
            id: `${player.theName}`,
            className: 'player-boards__board',
          },
          new PlayersBoard().renderPlayersBoard(player),
        ),
      ),
    );
  }

  private createPlayerPanel(player: Player): HTMLElement {
    this.playerPanel.setPlayer(player);
    return this.playerPanel.createPlayerPanel();
  }

  private createEndGameButton() {
    const endGameButton = Render.elementFactory(
      'button',
      { className: 'button endgame' },
      'End game',
    );
    endGameButton.addEventListener('click', () => {
      this.view.endGame();
    });
    return endGameButton;
  }

  private createBankPanel(bank: Bank): HTMLElement {
    return new BankBoard().renderBankBoard(bank);
  }

  private setBackground(player: Player): void {
    (document.querySelector(
      '#sf-app',
    ) as HTMLElement).style.background = player.theColor;
  }

  handleRoll(): void {
    this.view.handleRoll();
  }

  handleTrade(): void {
    this.view.handleTrade();
  }

  displayRollResult(
    diceResults: AnimalNames[],
    playerGain: [AnimalNames, number][],
  ): void {
    this.playerPanel.displayRollResult(diceResults, playerGain);
    this.renderPlayerPanel();
  }

  private renderPlayerPanel(): void {
    Render.removeAllChildren('#player-board');
    Render.render(
      '#player-board',
      ...this.playerPanel.createPanelBoard(),
    );
  }

  updateRemainingTime(timeLeft: number): void {
    this.playerPanel.updateTime(timeLeft);
  }

  stopTimer(): void {
    this.view.stopTimer();
  }

  nextTurn(): void {
    this.view.nextTurn();
  }

  turnAlert(): void {
    this.playerPanel.turnAlert();
  }

  pauseTurn(): void {
    this.view.pauseTurn();
  }

  disableTrade(): void {
    this.playerPanel.disableTrade();
  }

  refreshHerd(bank: Bank): void {
    this.playerPanel.refreshHerd();
    Render.removeElement('#bank-board');
    Render.render('#sf-app', this.createBankPanel(bank));
  }
}
