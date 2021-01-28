import { Render } from '../utils/Render';

export class MenuWindow {
  renderMenuWindow(): HTMLElement {
    const menuWindowHeading: HTMLElement = Render.elementFactory(
      'h1',
      { className: 'menu-window__heading heading' },
      'FARM TYCOON',
    );
    const menuWindowLogo: HTMLElement = Render.elementFactory(
      'div',
      { className: 'menu-window__logo-container' },
      Render.elementFactory('img', {
        src: '../../../static/images/ui/favicon.png',
        className: 'menu-window__logo',
      }),
    );
    const menuWindowDescription: HTMLElement = Render.elementFactory(
      'h2',
      { className: 'menu-window__description text' },
      'Breed animals, Do your math, Be quick, Plan ahead, Protect your herd, Predators are there to get your animals! Become a farmer and be the first to gather all the animals!',
    );
    const header: HTMLElement = Render.elementFactory(
      'header',
      { className: 'menu-window__header' },
      menuWindowLogo,
      menuWindowHeading,
      menuWindowDescription,
    );

    const menuImageLeft: HTMLElement = Render.elementFactory(
      'div',
      { className: 'menu__image-container' },
      Render.elementFactory('img', {
        src: '../../../static/images/avatars/dog.png',
        className: 'menu__image',
      }),
    );

    const menuImageRight: HTMLElement = Render.elementFactory(
      'div',
      { className: 'menu__image-container' },
      Render.elementFactory('img', {
        src: '../../../static/images/avatars/cow.png',
        className: 'menu__image',
      }),
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
        'RULES',
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
      menuImageLeft,
      menuButtonsContainer,
      menuImageRight,
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
