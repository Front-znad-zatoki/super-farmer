import { MenuWindow } from './components/MenuWindow';
import { Render } from './utils/Render';
import { View } from './View';

export class App {
  init(): string {
    const view = new MenuWindow().renderMenuWindow();
    Render.render('#sf-app', view);

    return 'hello world';
  }
}
