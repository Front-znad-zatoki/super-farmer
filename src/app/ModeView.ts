import { Render } from './utils/Render';
import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';
import { CallbackOneParam } from '~src/Interfaces/CallbackOneParamInterface';
import { Avatars } from '~src/Enums/AvatarsEnum';
import { Colors } from '~src/Enums/ColorsEnum';

export class ModeView {
  private modeView: HTMLElement;
  private modeViewContainer: HTMLElement;
  private modeForm: HTMLFormElement;
  private addPlayerButton: HTMLElement;
  private removePlayerButton: HTMLElement;
  private playerInputsWrapper: HTMLElement;
  private backButton!: HTMLElement;
  private playButton!: HTMLElement;
  private submitCallback: CallbackOneParam<PlayerDTO[]>;

  /**
   * @param submitCallback - will be called onSubmit with PlayerDTO[] data in the argument
   */
  constructor(submitCallback: CallbackOneParam<PlayerDTO[]>) {
    this.modeViewContainer = Render.elementFactory(
      'div',
      {
        className: 'mode-view__container',
      },
      Render.elementFactory(
        'h2',
        { className: 'mode-view__heading' },
        'Add your nick, choose avatar and color',
      ),
    );
    this.modeView = Render.elementFactory(
      'div',
      { className: 'mode-view hidden' },
      this.modeViewContainer,
    );
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
    Render.childrenInjector(
      this.modeViewContainer,
      this.modeForm,
      this.generateButtons(),
    );
    this.addEventListeners();
  }

  /**
   * Returns ModeView as HTMLElement.
   */
  get theModeView(): HTMLElement {
    return this.modeView;
  }

  hide(): void {
    this.modeView.classList.add('hidden');
  }

  show(): void {
    this.modeView.classList.remove('hidden');
  }

  private createForm(): HTMLFormElement {
    Render.childrenInjector(this.playerInputsWrapper);

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

    const playerInputRow = this.generateAddPlayerFields(
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

  private generateNameInput(numberOfPlayer: number): HTMLElement {
    const indicator = `name_${numberOfPlayer}`;
    const input = Render.elementFactory('input', {
      type: 'text',
      id: indicator,
      name: indicator,
      placeholder: `Player ${numberOfPlayer}`,
      className: 'mode-form__input',
    });

    return input;
  }

  private generateColorInput(numberOfPlayer: number): HTMLElement {
    const colorInputs: HTMLElement[] = Object.values(Colors).reduce(
      (colorsElements: HTMLElement[], value, index) => {
        const indicator = `${numberOfPlayer}colorChoice_${index + 1}`;
        const label = Render.elementFactory(
          'label',
          {
            for: indicator,
            className: 'mode-form__color-label',
          },
          Render.elementFactory('div', {
            className: 'mode-form__color-label',
            style: `background-color: ${value}`,
          }),
        );
        const radio = Render.elementFactory('input', {
          type: 'radio',
          name: `color_${numberOfPlayer}`,
          className: 'mode-form__color-radio',
          id: indicator,
          value: value,
        });
        colorsElements.push(
          Render.elementFactory(
            'div',
            { className: 'mode-form__color-wrapper' },
            label,
            radio,
          ),
        );
        return colorsElements;
      },
      [],
    );
    const colors = Render.elementFactory(
      'div',
      { className: 'mode-form__colors' },
      ...colorInputs,
    );

    return colors;
  }

  private generateAvatarInput(numberOfPlayer: number): HTMLElement {
    const avatarInputs: HTMLElement[] = Object.values(Avatars).reduce(
      (avatarsElements: HTMLElement[], value, index) => {
        const indicator = `${numberOfPlayer}avatarChoice_${
          index + 1
        }`;
        const label = Render.elementFactory(
          'label',
          {
            for: indicator,
            className: 'mode-form__avatar-label',
          },
          Render.elementFactory('img', {
            className: 'mode-form__avatar',
            src: value,
          }),
        );
        const radio = Render.elementFactory('input', {
          type: 'radio',
          name: `path_${numberOfPlayer}`,
          className: 'mode-form__avatar-radio',
          id: indicator,
          value: value,
        });
        avatarsElements.push(
          Render.elementFactory(
            'div',
            { className: 'mode-form__avatar-wrapper' },
            label,
            radio,
          ),
        );
        return avatarsElements;
      },
      [],
    );
    const colors = Render.elementFactory(
      'div',
      { className: 'mode-form__avatars' },
      ...avatarInputs,
    );

    return colors;
  }

  private generateAddPlayerFields(
    numberOfPlayer: number,
  ): HTMLElement {
    const fieldsWrapper = Render.elementFactory(
      'div',
      {},
      this.generateNameInput(numberOfPlayer),
      this.generateAvatarInput(numberOfPlayer),
      this.generateColorInput(numberOfPlayer),
    );
    return fieldsWrapper;
  }

  private convertDataFormToPlayersData(
    formData: FormData,
  ): PlayerDTO[] {
    const playersData = [];
    for (const [formKey, formValue] of formData.entries()) {
      const value = formValue.toString();
      const [key, numberOfPlayer] = formKey.split('_');
      const index = +numberOfPlayer - 1;
      switch (key) {
        case 'name': {
          playersData.push({
            name: '',
            path: Avatars.FARMER1,
            color: Colors.GREEN,
          } as PlayerDTO);
          playersData[index].name =
            value.trim().length > 0
              ? value
              : `Janush ${playersData.length}`;
          break;
        }
        case 'path': {
          playersData[index].path = value;
          break;
        }
        case 'color': {
          playersData[index].color = value;
          break;
        }
      }
    }
    return playersData;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const playersData = this.convertDataFormToPlayersData(formData);
    this.submitCallback(playersData);
    this.hide();
    this.modeForm.reset();
  };

  private handleClickAddPlayer = (): void => {
    this.addPlayer();
  };

  private handleClickRemovePlayer = (): void => {
    this.removePlayer();
  };

  private handleClickBackButton = (): void => {
    this.hide();
    this.modeForm.reset();
  };
}
