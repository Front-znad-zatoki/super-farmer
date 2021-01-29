import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';
import { Game } from './logic/Game';
import { mockGameConfiguration } from './logic/mockGameConfiguration';
import { Render } from './utils/Render';
import { View } from './View';

export class App {
  init(): string {
    const view = new View().renderMenuView();

    new Game(mockGameConfiguration).init();
    return 'hello world';
  }
}
