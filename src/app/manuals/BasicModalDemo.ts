//TO VIEW DEMO, INSERT IN APP.TS: 'new BasicModalDemo().createBasicModal()'

import { Button } from '../components/Button';
import { BasicModal } from '../components/BasicModal';
import { Render } from '../utils/Render';

export class BasicModalDemo extends BasicModal {
  // MOCK FOR MODAL

  createBasicModal(): void {
    this.renderBasicModal(
      'START GAME',
      'Choose your options',
      // CAN ADD CONTENT HERE, MOCK CONTENT:
      new Button().create('INSERTED BY RENDER BASIC MODAL'),
    );

    // MOCK CONTENT TO SHOW USAGE
    this.addModalContent(
      new Button().create('INSERTED BY ADD MODAL CONTENT'),
    );
    this.addModalContent(
      Render.elementFactory('img', {
        src: '../../static/Maps/Sprint01/Roadmap-sprint1.png',
        className: 'modal__image',
        style: 'width: auto; height: 50%;',
      }),
    );

    this.createAndAppendButtonsRow(
      'GO BACK',
      this.handleModalClose,
      'PLAY',
      this.handlePlayGame,
    );

    Render.render('#sf-app', this.modal);
  }

  private handleModalClose = () => {
    //TODO: WRITE LOGIC
    this.hideModal();
  };
  private handlePlayGame = () => {
    //TODO: WRITE LOGIC
    this.hideModal();
  };
}
