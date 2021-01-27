import { View } from './View';

export class App {
  init(): string {
    const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );
    console.log(vieew);
    return 'hello world';
  }
  //view = new View().renderMenuView();
}
