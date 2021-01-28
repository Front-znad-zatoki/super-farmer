import { ModalBasic } from './components/ModalBasic';
import { Render } from './utils/Render';
import { View } from './View';

export class App {
  init(): string {
    const basicModal: HTMLElement = new ModalBasic().renderBasicModal(
      'START GAME',
      'Choose your options',
    );
    Render.render('#sf-app', basicModal);
    /*const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );*/
    const view = new View().renderMenuView();

    return 'hello world';
  }
}
