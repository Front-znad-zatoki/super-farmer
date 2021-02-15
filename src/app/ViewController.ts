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
import { dynamicGameConfiguration } from './logic/dynamicGameConfiguration';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { cloneDeep } from 'lodash';

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

  launchGame(players: PlayerDTO[], isModeDynamic?: boolean): void {
    const config: Configuration =
      isModeDynamic === true
        ? new Configuration(cloneDeep(dynamicGameConfiguration))
        : new Configuration(defaultGameConfiguration);
    if (isModeDynamic) {
      const numberOfPlayers = players.length;
      config.livestockConfig = config.livestockConfig.map(
        (animal) => {
          if (animal.name === AnimalNames.RABBIT)
            animal.bankInitialStock -= numberOfPlayers;
          return animal;
        },
      );
    }
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
  // TODO: CHECK IF STILL NECESSARY
  // updateRemainingTime(timeLeft: number): void {
  //   this.gameView.updateRemainingTime(timeLeft);
  // }

  handleRoll(): void {
    this.gameController?.breed();
  }

  updateRollResults({ rollResult }: RollResult): void {
    if (this.gameController) {
      this.gameView.displayRollResult(rollResult);
    }
  }

  handleTrade(): void {
    this.gameController?.startTrade();
  }

  displayWinModal(player: Player): void {
    Render.render('body', this.winModal.createWinModal(player));
  }
  // TODO: CHECK IF STILL NECESSARY
  // turnAlert(): void {
  //   this.gameView.turnAlert();
  // }

  displayRulesModal(): void {
    // TODO: display rules
  }

  displayTradeModal(player: Player, trade: Trade): void {
    if (this.tradeModal) {
      this.tradeModal.setNextPlayer(player);
    } else {
      this.tradeModal = new TradeModal(
        trade,
        player,
        () => this.runTimer(),
        () => this.processAfterTrade(),
      );
      Render.render('body', this.tradeModal.createModal());
    }
  }

  processAfterTrade(): void {
    this.runTimer();
    this.disableTrade();
    this.checkIfGameIsWon();
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

  checkIfGameIsWon(): void {
    this.gameController?.checkIfGameIsWon();
  }
}
