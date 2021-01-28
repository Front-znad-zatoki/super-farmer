import { GameModes } from '~src/Enums/GameModeEnums';
import { AnimalNames } from '../Enums/AnimalNamesEnum';

export interface GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds: number;
  playersConfig: PlayersConfigInterface;
  bankConfig?: [AnimalNames, number][];
}

export interface PlayersConfigInterface {
  numberOfPlayers: number;
  players: { name: string; path: string }[];
}
