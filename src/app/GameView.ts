import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { Alert } from './components/Alert';
import { BankBoard } from './components/BankBoard';
import { PlayerPanel } from './components/PlayerPanel';
import { PlayersBoard } from './components/PlayersBoard';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class GameView {
  private playerPanel: PlayerPanel;
  // TODO: FIND OUT WHY THIS CREATES INSTANCE OF PLAYER PANEL IN CONTRUCTOR
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
    Render.render(
      '#sf-app',
      Alert.createElement(),
      Render.elementFactory(
        'div',
        { className: 'page-container' },
        playersBoards,
        playerPanel,
        Render.elementFactory(
          'div',
          { className: 'bank__bar' },
          endGameButton,
          Render.elementFactory(
            'div',
            { id: 'bank-board' },
            bankPanel,
          ),
        ),
      ),
    );
    this.setBackground(currentPlayer);
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
      '.page-container',
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

  pauseTurn(): void {
    this.view.pauseTurn();
  }

  disableTrade(): void {
    this.playerPanel.disableTrade();
  }

  refreshHerd(bank: Bank): void {
    this.playerPanel.refreshHerd();
    Render.removeAllChildren('#bank-board');
    Render.render('#bank-board', this.createBankPanel(bank));
  }
}
