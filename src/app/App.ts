import { ModeModalManual } from './manuals/ModeModalManual';

export class App {
  init(): string {
    ModeModalManual.playDemo();
    return 'hello world';
  }
}
