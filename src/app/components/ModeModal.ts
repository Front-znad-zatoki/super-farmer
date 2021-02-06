import { BasicModal } from './BasicModal';
import { Render } from '../utils/Render';
import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';

export class ModeModal extends BasicModal {
  private modeForm: HTMLFormElement;
  private playersData: PlayerDTO[];
  private playerElements: HTMLElement[];
  private addPlayerButton: HTMLElement;
  private playerInputsWrapper: HTMLElement;
  private backButton!: HTMLElement;
  private playButton!: HTMLElement;

  constructor() {
    super();
    this.playerElements = [];
    this.addPlayerButton = Render.elementFactory(
      'button',
      { type: 'button', className: 'mode-form__add-player-btn' },
      'add next player',
    );
    this.playerInputsWrapper = Render.elementFactory('div', {
      className: 'mode-inputs-wrapper',
    });
    this.modeForm = this.createForm();
    this.playersData = [];
  }

  createModeModal(): HTMLElement {
    this.renderBasicModal(
      'Add your nick, choose avatar and color',
      undefined,
      this.modeForm,
      this.generateButtons(),
    );
    this.addEventListeners();
    return this.modal;
  }

  private createForm(): HTMLFormElement {
    Render.childrenInjector(
      this.playerInputsWrapper,
      ...this.playerElements,
    );

    const form = Render.elementFactory(
      'form',
      {
        id: 'mode-form',
        action: '',
        method: 'get',
        className: 'mode-modal',
      },

      this.playerInputsWrapper,
      this.addPlayerButton,
    );
    this.addPlayer();

    return form as HTMLFormElement;
  }

  private addEventListeners(): void {
    this.modeForm.addEventListener('submit', this.handleSubmit);
    this.addPlayerButton.addEventListener(
      'click',
      this.handleClickAddPlayer,
    );
    this.backButton.addEventListener(
      'click',
      this.handleClickBackButton,
    );
  }

  private addPlayer(): void {
    const numberOfPlayers = this.playerInputsWrapper.children.length;
    if (numberOfPlayers >= 4) {
      return;
    }
    const playerInputRow = this.generatePlayerInput(
      numberOfPlayers + 1,
    );
    if (numberOfPlayers >= 3) {
      this.addPlayerButton.classList.add('hidden');
    }
    Render.childrenInjector(this.playerInputsWrapper, playerInputRow);
  }

  private generateButtons(): HTMLElement {
    this.backButton = Render.elementFactory(
      'button',
      {
        className: 'button',
      },
      'back',
    );
    this.playButton = Render.elementFactory(
      'button',
      {
        type: 'submit',
        form: 'mode-form',
        className: 'button',
      },
      'play',
    );
    const buttonsWrapper = Render.elementFactory(
      'div',
      {
        className: 'modal__buttons',
      },
      this.backButton,
      this.playButton,
    );
    return buttonsWrapper;
  }

  private generatePlayerInput(numberOfPlayer: number): HTMLElement {
    const indicator = `name_${numberOfPlayer}`;
    const label = Render.elementFactory(
      'label',
      { for: indicator, className: 'mode-modal__form-label' },
      Render.elementFactory('img', {
        className: 'mode-form__avatar',
        src: '../../static/images/playerAvatars/woman.svg',
      }),
    );

    const input = Render.elementFactory('input', {
      type: 'text',
      id: indicator,
      name: indicator,
      placeholder: `Player ${numberOfPlayer}`,
      className: 'mode-form__input',
    });
    const playerRow = Render.elementFactory(
      'div',
      { className: 'mode-form__row' },
      label,
      input,
    );
    return playerRow;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    for (const [key, value] of formData.entries()) {
      console.log(key + ': ' + value);
    }
  };

  private handleClickAddPlayer = (): void => {
    this.addPlayer();
  };

  private handleClickBackButton = (): void => {
    this.hideModal();
    this.modeForm.reset();
  };
}
