import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { Alert } from './components/Alert';
import { BankBoard } from './components/BankBoard';
import { PlayerPanel } from './components/PlayerPanel';
import { PlayersBoard } from './components/PlayersBoard';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';
import { AlertType } from '../Enums/AlertEnum';

export class GameView {
  playerPanel: PlayerPanel;
  constructor(private view: ViewController) {
    this.playerPanel = new PlayerPanel(this);
  }

  renderGameView(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ): void {
    const topRow = this.createTopRow();
    const gameBoardsAndPanel = this.createGameBoardsAndPanel(
      players,
      currentPlayer,
      bank,
    );

    Render.removeAllChildren('#sf-app');
    Render.render(
      '#sf-app',
      Render.elementFactory(
        'div',
        { className: 'game' },
        topRow,
        gameBoardsAndPanel,
      ),
    );
    // Render.render(
    //   '#sf-app',
    //   Render.elementFactory(
    //     'div',
    //     { className: 'game' },
    //     alertPanel,
    //     playersBoards,
    //     playerPanel,
    //     Render.elementFactory(
    //       'div',
    //       { className: 'bank__bar' },
    //       endGameButton,
    //       Render.elementFactory(
    //         'div',
    //         { id: 'bank-board' },
    //         bankPanel,
    //       ),
    //     ),
    //   ),
    // );
    // this.setBackground(currentPlayer);
  }

  private createTopRow() {
    const alertPanel = this.createAlertPanel();
    const endGameButton = this.createEndGameButton();
    const topRow = Render.elementFactory(
      'div',
      { className: 'game__top-row' },
      alertPanel,
      endGameButton,
    );
    return topRow;
  }
  private createGameBoardsAndPanel(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ) {
    const playersBoards = this.createPlayersBoards(players);
    const playerPanel = this.createPlayerPanel(currentPlayer);
    const bankPanel = this.createBankPanel(bank);
    const banksAndPanel = Render.elementFactory(
      'div',
      { className: 'game__side-panel' },
      bankPanel,
      playerPanel,
    );
    return Render.elementFactory(
      'div',
      { className: 'game__main' },
      playersBoards,
      banksAndPanel,
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
            // id: `${player.theName}`,
            className: 'player-boards__board',
          },
          new PlayersBoard().renderPlayersBoard(player),
        ),
      ),
    );
  }

  private createPlayerPanel(player: Player): HTMLElement {
    return this.playerPanel.createPlayerPanel(player);
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

  private createAlertPanel(): HTMLElement {
    let alertContainer = document.querySelector(
      '.alert',
    ) as HTMLElement;
    if (!alertContainer) alertContainer = Alert.createElement();
    // TODO: connect with other methods to display the right alert
    Alert.updateAlert('Lorem ipsum dolor sei', AlertType.INFO);
    return alertContainer;
  }

  private setBackground(): void {
    // private setBackground(player: Player): void {
    // (document.querySelector(
    //   '.page-container',
    // ) as HTMLElement).style.background = player.theColor;
    // TODO: change to borders and font colors
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
    player: Player,
  ): void {
    this.playerPanel.displayRollResult(
      diceResults,
      playerGain,
      player,
    );
    // this.renderPlayerPanel();
  }

  // private renderPlayerPanel(): void {
  //   Render.removeAllChildren('#player-board');
  //   Render.render(
  //     '#player-board',
  //     ...this.playerPanel.createPanelBoard(),
  //   );
  // }

  // updateRemainingTime(timeLeft: number): void {
  //   this.playerPanel.updateTime(timeLeft);
  // }

  stopTimer(): void {
    this.view.stopTimer();
  }

  nextTurn(): void {
    this.view.nextTurn();
  }

  // turnAlert(): void {
  //   this.playerPanel.turnAlert();
  // }

  pauseTurn(): void {
    this.view.pauseTurn();
  }

  disableTrade(): void {
    this.playerPanel.disableTrade();
  }

  // refreshHerd(bank: Bank): void {
  //   this.playerPanel.refreshHerd();
  //   Render.removeAllChildren('#bank-board');
  //   Render.render('#bank-board', this.createBankPanel(bank));
  // }
}
