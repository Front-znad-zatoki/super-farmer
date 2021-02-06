import { BasicModal } from './BasicModal';
import { Render } from '../utils/Render';

export class ModeModal extends BasicModal {
  modeForm: HTMLElement;

  constructor() {
    super();
    this.modeForm = Render.elementFactory('form', {
      id: 'trade-modal',
      action: '',
      method: 'post',
      className: 'mode-modal',
    });
  }

  createModeModal(): HTMLElement {
    this.renderBasicModal(
      'Add your nick, choose avatar and color',
      '',
      this.generateInputs(),
    );

    this.createAndAppendButtonsRow(
      'GO BACK',
      () => this.hideModal(),
      'PLAY',
      () => {
        this.hideModal();
      },
    );

    return this.modal;
  }

  private generateInputs(): HTMLElement {
    // Left side
    const player1Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/man.svg',
    });
    const player2Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/woman.svg',
    });

    const player1Name = Render.elementFactory('input', {
      type: 'text',
      id: '1_pname',
      name: '1_pname',
      placeholder: 'Player 1',
    });

    const player2Name = Render.elementFactory('input', {
      type: 'text',
      id: '2_pname',
      name: '2_pname',
      placeholder: 'Player 2',
    });

    const player1 = Render.elementFactory(
      'div',
      { className: 'player1' },
      player1Svg,
      player1Name,
    );
    const player2 = Render.elementFactory(
      'div',
      { className: 'player2' },
      player2Svg,
      player2Name,
    );

    const playersInfo = Render.elementFactory(
      'form',
      { className: 'mode-modal__players' },
      player1,
      player2,
    );

    // Right side

    const avatar1 = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/man.svg',
    });
    const avatar2 = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/woman.svg',
    });

    const avatarsWrapper = Render.elementFactory(
      'div',
      { className: 'mode-modal__avatars-wrapper' },
      avatar1,
      avatar2,
    );

    const colorsWrapper = Render.elementFactory('div', {
      className: 'mode-modal__colors-wrapper',
    });

    const modeModal = Render.elementFactory(
      'div',
      { className: 'modal__mode-modal' },
      playersInfo,
      avatarsWrapper,
      colorsWrapper,
    );
    return modeModal;
  }
}
