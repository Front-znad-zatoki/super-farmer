import { Render } from './utils/Render';
import { ViewController } from './ViewController';

export class MenuView {
  constructor(private view: ViewController) {}

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
        className: 'page__container',
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
        { className: 'menu-window__heading' },
        'TypeScript Game',
      ),
      Render.elementFactory(
        'p',
        { className: 'menu-window__description' },
        'description',
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
          className: 'menu__button--rules',
        },
        'rules',
      ),
    );
  }

  private createMenuButtons(): HTMLElement[] {
    const startGameButton = Render.elementFactory(
      'button',
      { className: 'menu__button' },
      'NEW GAME',
    );
    startGameButton.addEventListener('click', () =>
      this.view.launchGame(),
    );
    const settingsButton = Render.elementFactory(
      'button',
      {
        className: 'menu__button',
      },
      'SETTINGS',
    );
    settingsButton.setAttribute('disabled', 'true');
    const authorsButton = Render.elementFactory(
      'button',
      {
        className: 'menu__button--disabled',
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
