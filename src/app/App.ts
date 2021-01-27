import { Render } from './utils/Render';

export class App {
  init(): string {
    Render.render(
      '#sf-app',
      Render.elementFactory('img', {
        src: '/static/images/avatars/sheep.png',
        alt: 'avatar',
      }),
    );
    return 'hello world';
  }
}
