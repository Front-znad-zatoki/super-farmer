import { ModeModal } from '../ModeModal';
import { Render } from '../utils/Render';

export function ModeModalDemo() {
  const handleModalClose = () => {
    //TODO: WRITE LOGIC
    Render.removeElement('.modal');
  };
  const handlePlayGame = () => {
    //TODO: WRITE LOGIC
    Render.removeElement('.modal');
  };
  const modeModalDemo: ModeModal = new ModeModal();

  modeModalDemo.renderBasicModal(
    'Add your nick, choose avatar and color',
    '',
    ModeModal.createModeModal(),
  );

  modeModalDemo.createAndAppendButtonsRow(
    'GO BACK',
    handleModalClose,
    'PLAY',
    handlePlayGame,
  );

  Render.render('#sf-app', modeModalDemo.modal);
}
