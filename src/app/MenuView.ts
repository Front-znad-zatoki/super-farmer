import { ModeModal } from './components/ModeModal';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView {
  private modeModal: ModeModal;
  constructor(private view: ViewController) {
    this.modeModal = new ModeModal((players) =>
      // TODO: PASS INFO ABOUT MODE OR AI
      this.view.launchGame(players),
    );
    this.modeModal.hideModal();
    Render.render('body', this.modeModal.createModeModal());
  }

  displayMenu(): void {
    Render.removeAllChildren('#sf-app');
    Render.render('#sf-app', this.createLandingPage());
  }

  private createLandingPage(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'menu-window' },
      this.createHeading(),
      this.createPageContent(),
      this.createStartButton(),
      this.createFooter(),
    );
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
      this.modeModal.showModal();
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
