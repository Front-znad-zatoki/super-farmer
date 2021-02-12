import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';
import { ModeView } from '../ModeView';
import { Render } from '../utils/Render';

export class ModeViewManual {
  static playDemo(): void {
    const backCallback = () => console.log('go back');
    const submitCallback = (
      isDynamic: boolean,
      players: PlayerDTO[],
    ) => console.log(isDynamic, players);
    const modeView = new ModeView(backCallback, submitCallback);

    Render.render('#sf-app', modeView.theModeView);
  }
}
