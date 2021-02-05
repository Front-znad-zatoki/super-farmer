import { GameView } from './GameView';
import { Player } from '../Player';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { WinModal } from './components/WinModal';
import { MenuView } from './MenuView';
import { GameController } from './GameController';
import { RollResult } from './BreedProcessor';

export class ViewController {
  private menuView: MenuView;
  private gameView: GameView;
  private gameController: GameController | undefined;

  constructor() {
    this.menuView = new MenuView(this);
    this.gameView = new GameView(this);
    this.gameController = undefined;
  }

  get theGameView(): GameView {
    return this.gameView;
  }

  displayMenuView(): void {
    this.menuView.displayMenu();
  }

  launchGame(): void {
    this.gameController = new GameController(this);
    this.startGame(
      this.gameController.theGame.thePlayers,
      this.gameController.theGame.theCurrentPlayer,
      this.gameController.theGame.theBank,
    );
  }

  startGame(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ): void {
    this.gameView.renderGameView(players, currentPlayer, bank);
    this.gameController?.startTurn();
  }

  updateRemainingTime(timeLeft: number): void {
    this.gameView.updateRemainingTime(timeLeft);
  }

  handleRoll(): void {
    this.gameController?.breed();
  }

  updateRollResults({ rollResult, gain }: RollResult): void {
    this.gameView.displayRollResult(rollResult, gain);
  }

  handleTrade(): void {
    // TODO: exchange call
  }

  displayWinModal(player: Player): void {
    const winModal = new WinModal();
    winModal.create(player);
    winModal.addButton(this);
    Render.render('body', winModal.modal);
  }

  turnAlert(): void {
    this.gameView.turnAlert();
  }

  displayRulesModal(): void {
    // TODO: display rules
  }

  displayTradeModal(): void {
    // TODO: display trade
  }

  displaySettingsModal(): void {
    // TODO: display settings
  }

  stopTimer(): void {
    this.gameController?.stopTurn();
  }

  nextTurn(): void {
    this.gameController?.nextPlayer();
  }

  endGame(): void {
    this.gameController?.quitGame();
    this.gameController?.stopTurn();
    setTimeout(() => this.menuView.displayMenu(), 100);
  }

  pauseTurn(): void {
    this.gameController?.pauseTurn();
  }
}
