//     Add  ModeModalDemo(); in App.ts to see result
import { Button } from './Button';
import { ModalBasic } from './ModalBasic';
import { Render } from '../utils/Render';

export class ModeModal extends ModalBasic {
  static createModeModal(): HTMLElement {
    // Left side
    const player1Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/man.svg',
    });
    const player2Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/woman.svg',
    });
    const player3Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/man.svg',
    });
    const player4Svg = Render.elementFactory('img', {
      src: '../../static/images/playerAvatars/woman.svg',
    });

    const player1Name = Render.elementFactory('input', {
      type: 'text',
      id: 'pName',
      name: 'pName',
      placeholder: 'Player 1',
    });
    const player2Name = Render.elementFactory('input', {
      type: 'text',
      id: 'pName',
      name: 'pName',
      placeholder: 'Player 2',
    });
    const player3Name = Render.elementFactory('input', {
      type: 'text',
      id: 'pName',
      name: 'pName',
      placeholder: 'Player 3',
    });
    const player4Name = Render.elementFactory('input', {
      type: 'text',
      id: 'pName',
      name: 'pName',
      placeholder: 'Player 4',
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
    const player3 = Render.elementFactory(
      'div',
      { className: 'player3' },
      player3Svg,
      player3Name,
    );
    const player4 = Render.elementFactory(
      'div',
      { className: 'player4' },
      player4Svg,
      player4Name,
    );

    const playersInfo = Render.elementFactory(
      'form',
      { className: 'mode-modal__players' },
      player1,
      player2,
      player3,
      player4,
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

    const color1 = Render.elementFactory('input', {
      type: 'color',
      id: 'c1',
      name: 'c1',
      value: '#ff0000',
    });
    const color2 = Render.elementFactory('input', {
      type: 'color',
      id: 'c2',
      name: 'c2',
      value: '#ff00ff',
    });
    const color3 = Render.elementFactory('input', {
      type: 'color',
      id: 'c3',
      name: 'c3',
      value: '#66ff66',
    });
    const color4 = Render.elementFactory('input', {
      type: 'color',
      id: 'c4',
      name: 'c4',
      value: '#0066ff',
    });

    const colorsWrapper = Render.elementFactory(
      'div',
      { className: 'mode-modal__colors-wrapper' },
      color1,
      color2,
      color3,
      color4,
    );

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
