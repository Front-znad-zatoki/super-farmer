import { MenuWindow } from '../components/MenuWindow';
import { Render } from '../utils/Render';

export function menuWindowManual(): void {
  const menuWindowView = new MenuWindow().renderMenuWindow();
  Render.render('#sf-app', menuWindowView);
}

// TO RUN DEMO INSERT :  menuWindowManual() IN APP.TS;
