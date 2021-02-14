import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';
import { EmptyView } from './EmptyView';
import { ModeView } from './ModeView';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView extends EmptyView {
  private modeModal: ModeView;
  private menuViewContent: HTMLElement;
  constructor(private viewController: ViewController) {
    super(false);
    const backCallback = () => this.show();
    const submitCallback = (
      isDynamic: boolean,
      players: PlayerDTO[],
    ) => {
      Render.removeAllChildren('#sf-app');
      this.viewController.launchGame(players);
    };
    this.modeModal = new ModeView(backCallback, submitCallback);
    this.menuViewContent = Render.elementFactory(
      'div',
      { className: 'menu-window' },
      this.createHeading(),
      this.createPageContent(),
      this.createStartButton(),
      this.createFooter(),
    );
    this.viewContainer.appendChild(this.menuViewContent);
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
    const namesButtons: string[] = ['GAME RULES', 'AUTHORS'];
    const menuButtons = namesButtons.map((button) => {
      return Render.elementFactory(
        'button',
        { className: 'menu__button' },
        button,
      );
    });
    return menuButtons;
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
