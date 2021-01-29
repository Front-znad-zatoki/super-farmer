import { Render } from './utils/Render';
import { View } from './View';

export class App {
  init(): string {
    /*const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );*/
    const view = new View().renderMenuView();

    return 'hello world';
  }
}
