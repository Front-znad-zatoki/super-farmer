import { Render } from '../utils/Render';

export class MenuWindow {
  /**
   * Returns menu window, a landing page where a player can find out more info about the game and start to play.
   */
  renderMenuWindow(): HTMLElement {
    const menuWindowHeading: HTMLElement = Render.elementFactory(
      'h1',
      { className: 'menu-window__heading heading' },
      'FARM TYCOON',
    );
    const menuWindowDescription: HTMLElement = Render.elementFactory(
      'h2',
      { className: 'menu-window__description text' },
      'Breed animals, Do your math, Be quick, Plan ahead, Protect your herd, Predators are there to get your animals! Become a farmer and be the first to gather all the animals!',
    );
    const header: HTMLElement = Render.elementFactory(
      'header',
      { className: 'menu-window__header' },
      menuWindowHeading,
      menuWindowDescription,
    );

    const rulesButton = Render.elementFactory(
      'button',
      { type: 'button', className: 'menu__button--rules button' },
      'i',
    );

    //TODO: ADD ANIMATED GRAPHICS
    const menuGraphicLeft: HTMLElement = Render.elementFactory(
      'div',
      { className: 'menu__graphic-container' },
      'Animated Graphics',
    );

    const menuGraphicRight: HTMLElement = Render.elementFactory(
      'div',
      { className: 'menu__graphic-container' },
      'Animated Graphics',
    );

    const menuButtonsContainer: HTMLElement = Render.elementFactory(
      'nav',
      { className: 'menu__buttons' },
      // TODO: refactor to new Button() x4
      Render.elementFactory(
        'button',
        { type: 'button', className: 'menu__button button' },
        'PLAY',
      ),
      Render.elementFactory(
        'button',
        { type: 'button', className: 'menu__button button' },
        'SETTINGS',
      ),
      Render.elementFactory(
        'button',
        { type: 'button', className: 'menu__button button' },
        'AUTHORS',
      ),
    );

    const menu: HTMLElement = Render.elementFactory(
      'main',
      { className: 'menu' },
      menuGraphicLeft,
      menuButtonsContainer,
      menuGraphicRight,
      rulesButton,
    );

    const footer: HTMLElement = Render.elementFactory(
      'footer',
      {
        className: 'footer',
      },
      'CODERSCAMP 2020 - FRONT ZNAD ZATOKI',
    );

    const pageContainer: HTMLElement = Render.elementFactory(
      'div',
      { className: 'page__container menu-window' },
      header,
      menu,
      footer,
    );
    return pageContainer;
  }
}
