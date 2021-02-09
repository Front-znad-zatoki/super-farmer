import { PlayerDTO } from '../Interfaces/PlayerDTOInterface';
import { ModeModal } from './components/ModeModal';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView {
  private modeModal: ModeModal;
  constructor(private view: ViewController) {
    this.modeModal = new ModeModal((players: PlayerDTO[]) =>
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
      {
        className: 'page__container',
      },
      Render.elementFactory(
        'div',
        { className: 'page__container menu-window' },
        this.createHeading(),
        this.createPageContent(),
        this.createFooter(),
      ),
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
      'div',
      { className: 'menu__buttons' },
      ...this.createMenuButtons(),
    );
  }

  private createMenuButtons(): HTMLElement[] {
    const rulesButton = Render.elementFactory(
      'button',
      {
        className: 'menu__buttons__button',
      },
      'GAME RULES',
    );
    // rulesButton.setAttribute('disabled', 'true');
    const settingsButton = Render.elementFactory(
      'button',
      {
        className: 'menu__buttons__button',
      },
      'SETTINGS',
    );
    // settingsButton.setAttribute('disabled', 'true');
    const authorsButton = Render.elementFactory(
      'button',
      {
        className: 'menu__buttons__button',
      },
      'AUTHORS',
    );

    // authorsButton.setAttribute('disabled', 'true');
    const startGameButton = Render.elementFactory(
      'button',
      { className: 'menu__buttons--start' },
      'START',
    );
    startGameButton.addEventListener('click', () => {
      this.modeModal.showModal();
    });
    return [
      rulesButton,
      settingsButton,
      authorsButton,
      startGameButton,
    ];
  }

  private createFooter(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'footer' },
      'CodersCamp2020',
    );
  }
}
