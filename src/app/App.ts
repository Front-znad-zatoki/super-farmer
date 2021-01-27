import { ModalBasic } from './components/ModalBasic';
import { Render } from './utils/Render';

export class App {
  init(): string {
    const basicModal: HTMLElement = new ModalBasic().renderBasicModal(
      'START GAME',
      'Choose your options',
    );
    Render.render('#sf-app', basicModal);

    return 'hello world';
  }
}
