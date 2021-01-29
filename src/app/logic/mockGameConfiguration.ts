import { GameModes } from '~src/Enums/GameModeEnums';
import { GameConfigInterface } from '~src/Interfaces/GameConfigInterface';

export const mockGameConfiguration: GameConfigInterface = {
  mode: GameModes.DYNAMIC,
  roundTimeInSeconds: 15,
  totalGameTimeInSeconds: 500,
  playersConfig: [
    {
      name: 'Carlos Santanos',
      path: '../../static/images/avatars/dog.png',
    },
    {
      name: 'Pablo Escofarmo',
      path: '../../static/images/avatars/cow.png',
    },
  ],
};
