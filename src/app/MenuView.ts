import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';
import { EmptyView } from './EmptyView';
import { ModeView } from './ModeView';
import { RulesModal } from '../app/components/GameRulesModal';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView extends EmptyView {
  private modeModal: ModeView;
  private rulesModal: RulesModal;
  private menuViewContent: HTMLElement;
  constructor(private viewController: ViewController) {
    super();
    const backCallback = () => this.show();
    const submitCallback = (
      isDynamic: boolean,
      players: PlayerDTO[],
    ) => {
      Render.removeAllChildren('#sf-app');
      this.viewController.launchGame(players, isDynamic);
    };
    this.modeModal = new ModeView(backCallback, submitCallback);
    this.rulesModal = new RulesModal(backCallback);
    this.menuViewContent = Render.elementFactory(
      'div',
      { className: 'menu-window' },
      this.createHeading(),
      this.createPageContent(),
      this.createStartButton(),
      this.createFooter(),
    );
    this.view.appendChild(this.menuViewContent);
  }

  displayMenu(): void {
    Render.removeAllChildren('#sf-app');
    this.show();
    Render.render('#sf-app', this.view);
  }

  private createHeading(): HTMLElement {
    return Render.elementFactory(
      'h1',
      { className: 'menu-window__header' },
      'SUPERFARMER',
    );
  }

  private createPageContent(): HTMLElement {
    return Render.elementFactory(
      'nav',
      { className: 'menu' },
      ...this.createMenuButtons(),
    );
  }

  private createMenuButtons(): HTMLElement[] {
    // const namesButtons: string[] = ['GAME RULES', 'AUTHORS'];
    const rulesButton = Render.elementFactory(
      'button',
      { className: 'menu__button' },
      'GAME RULES',
    );
    rulesButton.addEventListener('click', () => {
      this.hide();
      Render.render('#sf-app', this.rulesModal.theRulesView);
      this.rulesModal.show();
    });
    // const menuButtons = namesButtons.map((button) => {
    const authorsButton = Render.elementFactory(
      'button',
      { className: 'menu__button' },
      'AUTHORS',
    );
    // });
    return [rulesButton, authorsButton];
  }
  private createStartButton(): HTMLElement {
    const startGameButton = Render.elementFactory(
      'button',
      { className: 'button--start' },
      'START',
    );
    startGameButton.addEventListener('click', () => {
      this.hide();
      Render.render('#sf-app', this.modeModal.theModeView);
      this.modeModal.show();
    });
    return startGameButton;
  }

  private createFooter(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'footer' },
      'CodersCamp2020',
    );
  }
}
