import { ModalBasic } from './components/ModalBasic';
import { Render } from './utils/Render';
import { View } from './View';

export class App {
  init(): string {
    // MOCK FOR MODAL
    const handleModalClose = () => {
      //TODO: WRITE LOGIC
      Render.removeElement('.modal');
    };
    const handlePlayGame = () => {
      //TODO: WRITE LOGIC
      Render.removeElement('.modal');
    };

    const basicModal: ModalBasic = new ModalBasic();

    const buttonsRow = basicModal.renderBottomButtons(
      'GO BACK',
      handleModalClose,
      'PLAY',
      handlePlayGame,
    );
    const newModal = basicModal.renderBasicModal(
      'START GAME',
      'Choose your options',
      undefined,
      buttonsRow,
    );

    Render.render('#sf-app', newModal.modal);
    /*const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );*/
    const view = new View().renderMenuView();

    return 'hello world';
  }
}
