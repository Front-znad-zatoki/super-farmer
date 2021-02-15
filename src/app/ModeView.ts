import { Render } from './utils/Render';
import {
  CallbackNoParam,
  CallbackTwoParam,
} from '~src/Interfaces/CallbackInterface';
import { Avatars } from '~src/Enums/AvatarsEnum';
import { Colors } from '~src/Enums/ColorsEnum';
import { EmptyView } from './EmptyView';
import { PlayerDTO } from '~src/Interfaces/PlayerDTOInterface';

export class ModeView extends EmptyView {
  private modeForm: HTMLFormElement;
  private addPlayerButton: HTMLElement;
  private removePlayerButton: HTMLElement;
  private addPanelsWrapper: HTMLElement;
  private backButton!: HTMLElement;
  private playButton!: HTMLElement;
  private submitCallback: CallbackTwoParam<boolean, PlayerDTO[]>;
  private backCallback: CallbackNoParam;

  /**
   * @param submitCallback - will be called onSubmit with isDynamic and PlayerDTO[] data in the arguments
   */
  constructor(
    backCallback: CallbackNoParam,
    submitCallback: CallbackTwoParam<boolean, PlayerDTO[]>,
  ) {
    super(true);
    this.addPlayerButton = Render.elementFactory(
      'button',
      {
        type: 'button',
        className: 'mode-form__add-btn',
      },
      Render.elementFactory('img', {
        className: 'mode-form__add-btn-img',
        src: '.\\static\\images\\ui\\plus-circle.svg',
      }),
    );
    this.removePlayerButton = Render.elementFactory(
      'button',
      {
        type: 'button',
        className: 'mode-form__remove-player-btn hidden',
      },
      'remove player',
    );
    this.addPanelsWrapper = Render.elementFactory('div', {
      className: 'mode-players-wrapper',
    });
    this.modeForm = this.createForm();
    this.backCallback = backCallback;
    this.submitCallback = submitCallback;

    Render.childrenInjector(
      this.view,
      this.modeForm,
      this.generateButtons(),
    );

    this.addEventListeners();
  }

  /**
   * Returns ModeView as HTMLElement.
   */
  get theModeView(): HTMLElement {
    return this.view;
  }

  private createForm(): HTMLFormElement {
    const heading = Render.elementFactory(
      'h2',
      { className: 'mode-view__heading' },
      'Click to add new player',
    );

    const mode = Render.elementFactory(
      'div',
      {
        className: 'mode-form__mode',
      },
      Render.elementFactory('input', {
        className: 'mode-form__mode-input',
        type: 'checkbox',
        id: 'mode',
        name: 'mode',
      }),
      Render.elementFactory(
        'label',
        {
          className: 'mode-form__mode-label',
          for: 'mode',
        },
        'dynamic mode',
      ),
    );
    const form = Render.elementFactory(
      'form',
      {
        id: 'mode-form',
        action: '',
        method: 'get',
        className: 'mode-form',
      },
      heading,
      mode,
      this.addPanelsWrapper,
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
    this.removePlayerButton.addEventListener(
      'click',
      this.handleClickRemovePlayer,
    );
  }

  private addPlayer(): void {
    const numberOfPlayers = this.addPanelsWrapper.children.length;
    if (numberOfPlayers >= 4) return;

    const playerInputRow = this.generateAddPlayerFields(
      numberOfPlayers + 1,
    );

    if (numberOfPlayers >= 3) {
      this.addPlayerButton.classList.add('hidden');
    }
    Render.childrenInjector(this.addPanelsWrapper, playerInputRow);
    if (numberOfPlayers === 1) {
      this.removePlayerButton.classList.remove('hidden');
    }
  }

  private removePlayer(): void {
    const numberOfPlayers = this.addPanelsWrapper.children.length;
    if (numberOfPlayers <= 1) return;

    if (numberOfPlayers === 4) {
      this.addPlayerButton.classList.remove('hidden');
    }

    (this.addPanelsWrapper.lastElementChild as Element).remove();

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
        className: 'mode__buttons',
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
      placeholder: 'type nickname here',
      className: 'mode-form__input',
    });

    return input;
  }

  private generateAICheckbox(numberOfPlayer: number): HTMLElement {
    const indicator = `ai_${numberOfPlayer}`;
    const checkbox = Render.elementFactory('input', {
      className: 'mode-form__ai-input',
      type: 'checkbox',
      id: indicator,
      name: indicator,
    });
    const label = Render.elementFactory(
      'label',
      {
        className: 'mode-form__ai-label',
      },
      'AI Player',
    );
    const aiWrapper = Render.elementFactory(
      'div',
      {
        className: 'mode-form__ai',
      },
      checkbox,
      label,
    );
    return aiWrapper;
  }

  private generateColorInput(numberOfPlayer: number): HTMLElement {
    const colorInputs: HTMLElement[] = Object.values(Colors).reduce(
      (colorsElements: HTMLElement[], value, index) => {
        const indicator = `${numberOfPlayer}colorChoice_${index + 1}`;
        const label = Render.elementFactory('label', {
          for: indicator,
          className: 'mode-form__color-label',
          style: `background-color: ${value}`,
        });
        const radio = Render.elementFactory('input', {
          type: 'radio',
          name: `color_${numberOfPlayer}`,
          className: 'mode-form__color-radio',
          id: indicator,
          required: '',
          value: value,
        });
        colorsElements.push(
          Render.elementFactory(
            'div',
            { className: 'mode-form__color-wrapper' },
            radio,
            label,
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
          required: 'true',
          value: value,
        });
        avatarsElements.push(
          Render.elementFactory(
            'div',
            { className: 'mode-form__avatar-wrapper' },
            radio,
            label,
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
      { className: 'mode-form__add-player' },
      this.generateNameInput(numberOfPlayer),
      this.generateAvatarInput(numberOfPlayer),
      this.generateColorInput(numberOfPlayer),
    );
    if (numberOfPlayer > 1) {
      Render.childrenInjector(
        fieldsWrapper,
        this.generateAICheckbox(numberOfPlayer),
        this.removePlayerButton,
      );
    }
    return fieldsWrapper;
  }

  private convertDataFormToPlayersData(
    formData: FormData,
  ): { isDynamic: boolean; players: PlayerDTO[] } {
    const players: PlayerDTO[] = [];
    let isDynamic = false;

    for (const [formKey, formValue] of formData.entries()) {
      const value = formValue.toString();
      const [key, numberOfPlayer] = formKey.split('_');
      const index = +numberOfPlayer - 1;
      switch (key) {
        case 'name': {
          players.push({
            name: '',
            path: '',
            color: '',
            isAI: false,
          } as PlayerDTO);
          players[index].name =
            value.trim().length > 0
              ? value
              : `Janush ${players.length}`;
          break;
        }
        case 'path': {
          players[index].path = value;
          break;
        }
        case 'color': {
          players[index].color = value;
          break;
        }
        case 'ai': {
          players[index].isAI = true;
          break;
        }
        case 'mode': {
          isDynamic = true;
          break;
        }
      }
    }

    return { isDynamic, players };
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const { isDynamic, players } = this.convertDataFormToPlayersData(
      formData,
    );
    this.submitCallback(isDynamic, players);
    this.hide();
    this.modeForm.reset();
  };

  private handleClickAddPlayer = (): void => {
    this.addPlayer();
  };

  private handleClickRemovePlayer = (): void => {
    this.removePlayer();
    this.addPanelsWrapper.lastChild?.appendChild(
      this.removePlayerButton,
    );
  };

  private handleClickBackButton = (): void => {
    this.hide();
    this.backCallback();
    this.modeForm.reset();
  };
}
