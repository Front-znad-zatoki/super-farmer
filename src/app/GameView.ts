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
import { EmptyView } from './EmptyView';
export class GameView extends EmptyView {
  protected playerPanel: PlayerPanel;
  constructor(private viewController: ViewController) {
    super(true);
    this.playerPanel = new PlayerPanel(this);
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
    const playerPanel = this.createPlayerPanel(currentPlayer);
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
    return Render.elementFactory(
      'div',
      { className: 'player-boards__container' },
      alertPanel,
      ...players.map((player) =>
        Render.elementFactory(
          'div',
          {
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
    return new BankBoard().renderBankBoard(bank);
  }

  private createAlertPanel(): HTMLElement {
    let alertContainer = document.querySelector(
      '.alert',
    ) as HTMLElement;
    if (!alertContainer) alertContainer = Alert.createElement();
    // TODO: connect with other methods to display the right alert
    Alert.updateAlert('Lorem ipsum dolor sei', AlertType.CRITICAL);
    return alertContainer;
  }

  private setColorAccents(player: Player): void {
    document
      .querySelectorAll('.player-panel__buttons .button')
      .forEach((element) => {
        (element as HTMLElement).style.borderColor = player.theColor;
      });
    // TODO: change to borders and font colors
  }

  handleRoll(): void {
    this.viewController.handleRoll();
  }

  handleTrade(): void {
    this.viewController.handleTrade();
  }

  displayRollResult(diceResults: AnimalNames[]): void {
    this.playerPanel.displayRollResult(diceResults);
  }

  updateRemainingTime(timeLeft: number): void {
    new PlayersBoard().updateTime(timeLeft);
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

}
