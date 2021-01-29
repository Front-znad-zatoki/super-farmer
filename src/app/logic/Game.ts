import { AnimalNames } from '~src/Enums/AnimalNamesEnum';
import { GameModes } from '~src/Enums/GameModeEnums';
import {
  GameConfigInterface,
  PlayersConfigInterface,
} from '~src/Interfaces/GameConfigInterface';
import { Player } from '~src/Player';

export class Game implements GameConfigInterface {
  mode: GameModes;
  roundTimeInSeconds: number;
  totalGameTimeInSeconds: number;
  playersConfig: PlayersConfigInterface;
  bankConfig?: [AnimalNames, number][];

  constructor(configObject: GameConfigInterface) {
    this.mode = configObject.mode;
    this.roundTimeInSeconds = configObject.roundTimeInSeconds;
    this.totalGameTimeInSeconds = configObject.totalGameTimeInSeconds;
    this.playersConfig = configObject.playersConfig;
    this.bankConfig = configObject.bankConfig;
  }

  init(): void {
    const players = this.playersConfig.players;
    const playersObjectsArray: Player[] = players.map((player) => {
      return new Player(player.name, player.path);
    });
    console.log(playersObjectsArray);
  }
}
