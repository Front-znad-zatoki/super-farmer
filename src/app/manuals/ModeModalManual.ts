import { ModeModal } from '../components/ModeModal';
import { Render } from '../utils/Render';

export class ModeModalManual {
  static playDemo(): void {
    const modeModal = new ModeModal((playersData) =>
      console.log(playersData),
    );

    Render.render('#sf-app', modeModal.createModeModal());
  }
}
