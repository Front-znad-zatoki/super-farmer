import { GameModes } from '../Enums/GameModeEnums';
import { LivestockConfigInterface } from './LivestockConfigInterface';
import { PlayerDTO } from './PlayerDTOInterface';
import { PredatorsConfigInterface } from './PredatorsConfigInterface';
import { ProtectorsConfigInterface } from './ProtectorsConfigInterface';
import { PlayerDTO } from './PlayerDTOInterface';

export interface GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds?: number;
  playersConfig: PlayerDTO[];
  livestockConfig: LivestockConfigInterface[];
  protectorsConfig: ProtectorsConfigInterface[];
  predatorsConfig: PredatorsConfigInterface[];
}
