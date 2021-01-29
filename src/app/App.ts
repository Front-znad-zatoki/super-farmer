import { Button } from './components/Button';
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

    basicModal.renderBasicModal(
      'START GAME',
      'Choose your options',
      // CAN ADD CONTENT HERE, MOCK CONTENT:
      new Button().create('INSERTED BY RENDER BASIC MODAL'),
    );

    // MOCK CONTENT TO SHOW USAGE
    basicModal.addModalContent(
      new Button().create('INSERTED BY ADD MODAL CONTENT'),
    );
    basicModal.addModalContent(
      Render.elementFactory('img', {
        src: '../../static/Maps/Sprint01/Roadmap-sprint1.png',
        className: 'modal__image',
        style: 'width: auto; height: 50%;',
      }),
    );

    basicModal.createAndAppendButtonsRow(
      'GO BACK',
      handleModalClose,
      'PLAY',
      handlePlayGame,
    );

    Render.render('#sf-app', basicModal.modal);
    /*const vieew = new View().renderGameView(
      'AJAJAJ',
      `../../resources/images/avatars/dog.png`,
    );*/
    const view = new View().renderMenuView();

    return 'hello world';
  }
}
