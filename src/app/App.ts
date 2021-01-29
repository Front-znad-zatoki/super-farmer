import { View } from './View';

export class App {
  init(): string {
    const view = new View().renderMenuView();

    return 'hello world';
  }
}
