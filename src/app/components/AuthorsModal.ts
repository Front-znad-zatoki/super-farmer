import { CallbackNoParam } from '~src/Interfaces/CallbackInterface';
import { EmptyView } from '../EmptyView';
import { Render } from '../utils/Render';

export class AuthorsModal extends EmptyView {
  private backCallback: CallbackNoParam;
  constructor(backCallback: CallbackNoParam) {
    super();
    this.backCallback = backCallback;
    const heading = Render.elementFactory(
      'h2',
      { className: 'modal__heading' },
      'Authors',
    );
    const authorsTuples = [
      ['Paulina', 'https://github.com/paula0403'],
      ['Sebastian', 'https://github.com/SebastianBabinski1'],
      ['Weronika', 'https://github.com/vieraboschkova'],
      ['Dominik', 'https://github.com/DominikNowak'],
      ['Aleksandra', 'https://github.com/synowa'],
      ['Sebastian', 'https://github.com/Enessetere'],
    ];
    const authors = authorsTuples.map((author) => {
      return Render.elementFactory(
        'li',
        { className: 'author' },

        Render.elementFactory(
          'a',
          { href: author[1], className: 'author__link' },
          author[0],
        ),
      );
    });
    const logo = Render.elementFactory(
      'img',
      { className: 'logo',
        src: './static/images/ui/logo.png',
        alt: 'logo',
       },
    )
    const mentor = ['Aleksander', 'https://github.com/aleksanderwalczuk'];
    const thanks = Render.elementFactory(
      'li',
      { className: 'author' },
      'Special thanks to our mentor',
      Render.elementFactory(
        'a',
        { href: mentor[1], className: 'author__link' },
        mentor[0],
      ),
    );

    const text = Render.elementFactory(
      'ul',
      {
        className: 'modal__text--rules',
      },
      logo,
      ...authors,
      thanks,
    );

    const button = Render.elementFactory(
      'button',
      { type: 'button', className: 'button--start button--nav' },
      'BACK TO MENU',
    );
    button.addEventListener('click', () => {
      this.hide();
      this.backCallback();
    });
    Render.childrenInjector(this.view, heading, text, button);
  }

  get theAuthorsView(): HTMLElement {
    return this.view;
  }
}
