import { ViewController } from './ViewController';

export class App {
  init(): void {
    const view = new ViewController();
    view.displayMenuView();
  }
}
