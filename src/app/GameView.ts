import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { Alert } from './components/Alert';
import { BankBoard } from './components/BankBoard';
import { PlayerPanel } from './components/PlayerPanel';
import { PlayersBoard } from './components/PlayersBoard';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';
import { EmptyView } from './EmptyView';
import { PlayersBoardBuilder } from './components/PlayerBoardBuilder';

export class GameView extends EmptyView {
  protected playerPanel: PlayerPanel;
  private playersBoard: PlayersBoard[];
  private bankBoard: BankBoard;
  constructor(private viewController: ViewController) {
    super(true);
    this.playerPanel = new PlayerPanel(this);
    this.playersBoard = [];
  }

  renderGameView(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ): void {
    // const topRow = this.createTopRow();
    const gameBoardsAndPanel = this.createGameBoardsAndPanel(
      players,
      currentPlayer,
      bank,
    );

    Render.removeAllChildren(this.view);
    this.view.appendChild(
      Render.elementFactory(
        'div',
        { className: 'game' },
        // topRow,
        gameBoardsAndPanel,
      ),
    );
    Render.render('#sf-app', this.view);
    this.setColorAccents(currentPlayer);
  }

  private createGameBoardsAndPanel(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ) {
    const playersBoards = this.createPlayersBoards(players);
    const playerPanel = this.createPlayerPanel();
    const bankPanel = this.createBankPanel(bank);

    const endGameButton = this.createEndGameButton();
    const banksAndPanel = Render.elementFactory(
      'div',
      { className: 'game__side-panel' },
      endGameButton,
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
    const alertPanel = this.createAlertPanel();
    this.playersBoard.splice(0);
    this.playersBoard.push(
      ...players.map((player) => PlayersBoardBuilder.build(player)),
    );
    const playersBoards = Render.elementFactory(
      'div',
      { className: 'player-boards__container' },
      alertPanel,
      ...this.playersBoard.map((playerBoard) =>
        Render.elementFactory(
          'div',
          {
            className: 'player-boards__board',
          },
          playerBoard.thePlayerBoard,
        ),
      ),
    );
    this.playersBoard[0].setBorderAndTimer();
    return playersBoards;
  }

  private createPlayerPanel(): HTMLElement {
    return this.playerPanel.createPlayerPanel();
  }

  private createEndGameButton() {
    const crossInButton = Render.elementFactory(
      'p',
      {
        'aria-hidden': 'true',
        className: 'endgame__text',
      },
      'X',
    );
    const endGameButton = Render.elementFactory(
      'button',
      {
        className: 'button endgame',
        'aria-label': 'End game',
        'data-tooltip': 'END GAME',
      },
      crossInButton,
    );

    endGameButton.addEventListener('click', () => {
      this.viewController.endGame();
    });
    return endGameButton;
  }

  private createBankPanel(bank: Bank): HTMLElement {
    this.bankBoard = new BankBoard(bank);
    return this.bankBoard.theBankView;
  }

  private createAlertPanel(): HTMLElement {
    let alertContainer = document.querySelector(
      '.alert',
    ) as HTMLElement;
    if (!alertContainer) alertContainer = Alert.createElement();
    return alertContainer;
  }

  private setColorAccents(player: Player): void {
    (document.querySelector(
      '.player-panel__result',
    ) as HTMLElement).style.borderColor = player.theColor;
  }

  handleRoll(): void {
    this.viewController.handleRoll();
    this.disableButtons();
  }

  handleTrade(): void {
    this.viewController.handleTrade();
  }

  displayRollResult(
    diceResults: AnimalNames[],
    playerIdx: number,
  ): void {
    this.playerPanel.displayRollResult(diceResults);
    this.updateBoard(playerIdx);
    this.bankBoard.updateBank();
    this.playersBoard[playerIdx].hideTimer();
  }

  updateRemainingTime(timeLeft: number, currentPlayer: number): void {
    this.playersBoard[currentPlayer].updateTime(timeLeft);
  }

  stopTimer(): void {
    this.viewController.stopTimer();
  }

  nextTurn(): void {
    this.viewController.nextTurn();
  }

  pauseTurn(): void {
    this.viewController.pauseTurn();
  }

  disableTrade(): void {
    this.playerPanel.disableTrade();
  }

  disableRoll(): void {
    this.playerPanel.disableRoll();
  }

  updateBoard(playerIndex: number): void {
    this.playersBoard[playerIndex].updateBoard();
    this.bankBoard.updateBank();
  }

  changePlayer(playerIndex: number): void {
    this.playersBoard[
      playerIndex === 0
        ? this.playersBoard.length - 1
        : playerIndex - 1
    ].removeBorderAndTimer();
    this.playersBoard[playerIndex].setBorderAndTimer();
    this.setColorAccents(this.playersBoard[playerIndex].thePlayer);
    this.enableButtons();
    this.playerPanel.clearResults();
  }

  disableButtons(): void {
    (document.querySelector('#exchange') as HTMLElement).setAttribute(
      'disabled',
      'true',
    );
    (document.querySelector(
      '#roll-dice',
    ) as HTMLElement).setAttribute('disabled', 'true');
  }

  enableButtons(): void {
    (document.querySelector(
      '#exchange',
    ) as HTMLElement).removeAttribute('disabled');
    (document.querySelector(
      '#roll-dice',
    ) as HTMLElement).removeAttribute('disabled');
  }
}
