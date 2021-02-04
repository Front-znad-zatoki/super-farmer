import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { Player } from '../Player';
import { PlayerPanel } from './components/PlayerPanel';
import { Bank } from './logic/Bank';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class GameView {
  private playerPanel: PlayerPanel;

  constructor(private view: ViewController) {}

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
      playersBoards,
      playerPanel,
      endGameButton,
      bankPanel,
    );
  }

  private createPlayersBoards(players: Player[]): HTMLElement {
    return Render.elementFactory(
      'div',
      {},
      ...players.map((player) =>
        Render.elementFactory(
          'div',
          { id: `${player.theName}` },
          JSON.stringify(player), // TODO: renderPlayerBoard <== Task #55
        ),
      ),
    );
  }

  private createPlayerPanel(player: Player): HTMLElement {
    this.playerPanel = new PlayerPanel(player, this);
    return this.playerPanel.createPlayerPanel();
  }

  private createEndGameButton() {
    const endGameButton = Render.elementFactory(
      'button',
      {},
      'End game',
    );
    endGameButton.addEventListener('click', () =>
      this.view.endGame(),
    );
    return endGameButton;
  }

  private createBankPanel(bank: Bank): HTMLElement {
    return Render.elementFactory('div', {}, JSON.stringify(bank)); // TODO: Use bank element from task #56
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
  }

  updateRemainingTime(timeLeft: number): void {
    this.playerPanel.updateTime(timeLeft);
  }
}
