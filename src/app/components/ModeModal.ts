import { BasicModal } from './BasicModal';
import { Render } from '../utils/Render';
import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';
import { CallbackOneParam } from '~src/Interfaces/CallbackOneParamInterface';

export class ModeModal extends BasicModal {
  private modeForm: HTMLFormElement;
  private playerElements: HTMLElement[];
  private addPlayerButton: HTMLElement;
  private removePlayerButton: HTMLElement;
  private playerInputsWrapper: HTMLElement;
  private backButton!: HTMLElement;
  private playButton!: HTMLElement;
  private submitCallback: CallbackOneParam<PlayerDTO[]>;

  /**
   * @param submitCallback - will be called onSubmit with PlayerDTO[] data in the argument
   */
  // TODO: ADD CHECKBOX FOR MODE AND PASS IT IN CALLBACK
  constructor(submitCallback: CallbackOneParam<PlayerDTO[]>) {
    super();
    this.playerElements = [];
    this.addPlayerButton = Render.elementFactory(
      'button',
      {
        type: 'button',
        className: 'mode-form__add-player-btn',
      },
      'add next player',
    );
    this.removePlayerButton = Render.elementFactory(
      'button',
      {
        type: 'button',
        className: 'mode-form__remove-player-btn hidden',
      },
      'remove player',
    );
    this.playerInputsWrapper = Render.elementFactory('div', {
      className: 'mode-inputs-wrapper',
    });
    this.modeForm = this.createForm();
    this.submitCallback = submitCallback;
  }

  /**
   * Creates ModeModal and returns it as HTMLElement.
   */
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
      this.removePlayerButton,
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
    this.removePlayerButton.addEventListener(
      'click',
      this.handleClickRemovePlayer,
    );
  }

  private addPlayer(): void {
    const numberOfPlayers = this.playerInputsWrapper.children.length;
    if (numberOfPlayers >= 4) return;

    const playerInputRow = this.generatePlayerInput(
      numberOfPlayers + 1,
    );

    if (numberOfPlayers >= 3) {
      this.addPlayerButton.classList.add('hidden');
    }
    Render.childrenInjector(this.playerInputsWrapper, playerInputRow);
    if (numberOfPlayers === 1) {
      this.removePlayerButton.classList.remove('hidden');
    }
  }

  private removePlayer(): void {
    const numberOfPlayers = this.playerInputsWrapper.children.length;
    if (numberOfPlayers <= 1) return;

    if (numberOfPlayers === 4) {
      this.addPlayerButton.classList.remove('hidden');
    }

    (this.playerInputsWrapper.lastElementChild as Element).remove();

    if (numberOfPlayers === 2)
      this.removePlayerButton.classList.add('hidden');
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
        src: './static/images/playerAvatars/woman.svg',
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

  private convertDataFormToPlayersData(
    formData: FormData,
  ): PlayerDTO[] {
    const playersData = [];
    for (const [formKey, formValue] of formData.entries()) {
      const playerDTO: PlayerDTO = {
        name: '',
        path: './static/images/playerAvatars/woman.svg',
        color: '#064a89',
      };
      const value = formValue.toString();
      const [key] = formKey.split('_');
      switch (key) {
        case 'name': {
          playerDTO.name =
            value.trim().length > 0
              ? value
              : `Janush ${playersData.length + 1}`;
          break;
        }
        case 'path': {
          playerDTO.path = value;
          break;
        }
        case 'color': {
          playerDTO.color = value;
          break;
        }
      }
      playersData.push(playerDTO);
    }
    return playersData;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const playersData = this.convertDataFormToPlayersData(formData);
    this.submitCallback(playersData);
    this.hideModal();
    this.modeForm.reset();
  };

  private handleClickAddPlayer = (): void => {
    this.addPlayer();
  };

  private handleClickRemovePlayer = (): void => {
    this.removePlayer();
  };

  private handleClickBackButton = (): void => {
    this.hideModal();
    this.modeForm.reset();
  };
}
