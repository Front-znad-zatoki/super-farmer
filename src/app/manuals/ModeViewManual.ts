import { ModeView } from '../components/ModeView';
import { Render } from '../utils/Render';

export class ModeViewManual {
  static playDemo(): void {
    const modeView = new ModeView((playersData) =>
      console.log(playersData),
    );

    Render.render('#sf-app', modeView.theModeView);
  }
}
