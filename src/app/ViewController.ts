import { GameView } from './GameView';
import { Player } from '../Player';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { WinModal } from './components/WinModal';
import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { MenuView } from './MenuView';

export class ViewController {
  private menuView: MenuView;
  private gameView: GameView;

  constructor() {
    this.menuView = new MenuView(this);
    this.gameView = new GameView(this);
  }

  get theGameView(): GameView {
    return this.gameView;
  }

  displayMenuView(): void {
    this.menuView.displayMenu();
  }

  launchGame(): void {
    // TODO: will be replaced with game controller call
    const player1 = new Player(
      'Misha',
      './static/images/avatars/sheep.png',
      '#95AF34',
    );
    const player2 = new Player(
      'Wania',
      './static/images/avatars/pig.png',
      '#AF3287',
    );
    const bank = new Bank();
    this.startGame([player1, player2], player1, bank);
  }

  startGame(
    players: Player[],
    currentPlayer: Player,
    bank: Bank,
  ): void {
    const gameView = new GameView(this);
    gameView.renderGameView(players, currentPlayer, bank);
  }

  updateRemainingTime(timeLeft: number): void {
    this.gameView.updateRemainingTime(timeLeft);
  }

  handleRoll(): void {
    // TODO: roll the dice call
  }

  updateRollResults(
    diceResults: AnimalNames[],
    playerGain: [AnimalNames, number][],
  ): void {
    this.gameView.displayRollResult(diceResults, playerGain);
  }

  handleTrade(): void {
    // TODO: exchange call
  }

  displayWinModal(): void {
    // TODO: win modal with correct data
    const winModal = new WinModal();
    const player = new Player(
      'Misha',
      './static/images/avatars/dog.png',
      '#55AF83',
    );
    winModal.create(player);
    winModal.addButton(this);
    Render.render('body', winModal.modal);
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

  endGame(): void {
    this.menuView.displayMenu();
  }
}
