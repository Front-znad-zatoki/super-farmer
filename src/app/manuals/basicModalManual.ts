//TO VIEW DEMO, INSERT IN APP.TS: basicModalDemo()

import { Button } from '../components/Button';
import { BasicModal } from '../components/BasicModal';
import { Render } from '../utils/Render';

export function basicModalDemo(): void {
  // MOCK FOR MODAL
  const handleModalClose = () => {
    //TODO: WRITE LOGIC
    Render.removeElement('.modal');
  };
  const handlePlayGame = () => {
    //TODO: WRITE LOGIC
    Render.removeElement('.modal');
  };

  const basicModal: BasicModal = new BasicModal();

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
}
