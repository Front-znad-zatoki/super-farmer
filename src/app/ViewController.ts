import { GameView } from './GameView';
import { Player } from '../Player';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { WinModal } from './components/WinModal';
import { MenuView } from './MenuView';
import { GameController } from './GameController';
import { RollResult } from './BreedProcessor';
import { Trade } from './Trade';
import { TradeModal } from './components/TradeModal';
import { defaultGameConfiguration } from './logic/defaultGameConfiguration';
import { PlayerDTO } from '../Interfaces/PlayerDTOInterface';
import { Configuration } from './logic/Configuration';
import { GameModes } from '../../src/Enums/GameModeEnums';
import { dynamicGameConfiguration } from './logic/dynamicGameConfiguration';

export class ViewController {
  private menuView: MenuView;
  private gameView: GameView;
  private winModal: WinModal;
  private gameController: GameController | undefined;
  private tradeModal: TradeModal | undefined;

  constructor() {
    this.menuView = new MenuView(this);
    this.gameView = new GameView(this);
    this.winModal = new WinModal(this);
    this.gameController = undefined;
  }

  get theGameView(): GameView {
    return this.gameView;
  }

  displayMenuView(): void {
    this.menuView.displayMenu();
  }
  /*TODO: CHECK IF AI NEEDED, CONNECT WITH CALLBACK THAT PASSES PLAYERS*/
  launchGame(players: PlayerDTO[], mode?: GameModes): void {
    // TODO: REMOVE NEXT 3 LINES AFTER PASSING MODE AS AN ARGUMENT IS IMPLEMENTED
    let gameMode: GameModes = GameModes.STATIC;
    gameMode = GameModes.DYNAMIC;
    // gameMode = GameModes.STATIC;
    const config: Configuration =
      gameMode === GameModes.DYNAMIC
        ? new Configuration(dynamicGameConfiguration)
        : new Configuration(defaultGameConfiguration);
    console.log(config);
    config.playersConfig = players;
    this.gameController = new GameController(this, config);
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
    this.gameController?.startTrade();
  }

  displayWinModal(player: Player): void {
    Render.render('body', this.winModal.createWinModal(player));
  }

  turnAlert(): void {
    this.gameView.turnAlert();
  }

  displayRulesModal(): void {
    // TODO: display rules
  }

  displayTradeModal(player: Player, trade: Trade): void {
    if (this.tradeModal) {
      this.tradeModal.setNextPlayer(player);
    } else {
      this.tradeModal = new TradeModal(trade, player, this);
      Render.render('body', this.tradeModal.createModal());
    }
  }

  displayAuthorsModal(): void {
    // TODO: display authors
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

  runTimer(): void {
    this.gameController?.resumeTurn();
  }

  disableTrade(): void {
    this.gameView.disableTrade();
  }

  refreshHerd(): void {
    this.gameView.refreshHerd(this.gameController?.getBank() as Bank);
  }

  checkIfGameIsWon(): void {
    this.gameController?.checkIfGameIsWon();
  }
}
