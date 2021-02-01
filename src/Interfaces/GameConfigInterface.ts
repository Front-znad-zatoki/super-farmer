import { GameModes } from '../Enums/GameModeEnums';
import { LivestockConfigInterface } from './LivestockConfigInterface';
import { PredatorsConfigInterface } from './PredatorsConfigInterface';
import { ProtectorsConfigInterface } from './ProtectorsConfigInterface';

export interface GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds?: number;
  playersConfig: { name: string; path: string; color: string }[];
  livestockConfig: LivestockConfigInterface[];
  protectorsConfig: ProtectorsConfigInterface[];
  predatorsConfig: PredatorsConfigInterface[];
}
