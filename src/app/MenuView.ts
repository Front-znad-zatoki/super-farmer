import { ModeView } from './ModeView';
import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView {
  private modeModal: ModeView;
  constructor(private view: ViewController) {
    this.modeModal = new ModeView((players) =>
      this.view.launchGame(players),
    );
    // this.modeModal.hide();
    Render.render('body', this.modeModal.theModeView);
  }

  displayMenu(): void {
    Render.removeAllChildren('#sf-app');
    Render.render(
      '#sf-app',
      this.createLandingPage(),
      this.createFooter(),
    );
  }

  private createLandingPage(): HTMLElement {
    return Render.elementFactory(
      'div',
      {
        className: 'page__container menu-window',
      },
      this.createHeading(),
      this.createPageContent(),
    );
  }

  private createHeading(): HTMLElement {
    return Render.elementFactory(
      'header',
      { className: 'menu-window__header' },
      Render.elementFactory(
        'h1',
        { className: 'menu-window__heading heading' },
        'FARM TYCOON',
      ),
      Render.elementFactory(
        'h2',
        { className: 'menu-window__description text' },
        'Breed animals, Do your math, Be quick, Plan ahead, Protect your herd, Predators are there to get your animals! Become a farmer and be the first to gather all the animals!',
      ),
    );
  }

  private createPageContent(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'menu' },
      Render.elementFactory('div', {
        className: 'menu__graphic-container',
      }),
      Render.elementFactory(
        'div',
        { className: 'menu__buttons' },
        ...this.createMenuButtons(),
      ),
      Render.elementFactory('div', {
        className: 'menu__graphic-container',
      }),
      Render.elementFactory(
        'button',
        {
          className: 'menu__button--rules button',
        },
        'i',
      ),
    );
  }

  private createMenuButtons(): HTMLElement[] {
    const startGameButton = Render.elementFactory(
      'button',
      { className: 'button' },
      'NEW GAME',
    );
    startGameButton.addEventListener('click', () => {
      this.modeModal.show();
    });
    const settingsButton = Render.elementFactory(
      'button',
      {
        className: 'button',
      },
      'SETTINGS',
    );
    settingsButton.setAttribute('disabled', 'true');
    const authorsButton = Render.elementFactory(
      'button',
      {
        className: 'button',
      },
      'AUTHORS',
    );
    authorsButton.setAttribute('disabled', 'true');
    return [startGameButton, settingsButton, authorsButton];
  }

  private createFooter(): HTMLElement {
    return Render.elementFactory(
      'div',
      { className: 'footer' },
      'CodersCamp2020',
    );
  }
}
