import { LivestockConfigInterface } from '../Interfaces/LivestockConfigInterface';
import { PredatorsConfigInterface } from '../Interfaces/PredatorsConfigInterface';
import { ProtectorsConfigInterface } from '../Interfaces/ProtectorsConfigInterface';
import { Dice } from './Dice';

/**
 * Builds two dice, depends on configuration.
 * Usage: DiceBuilder.build()
 */
export class DiceBuilder {
  static build(
    livestockConfig: LivestockConfigInterface[],
    predatorsConfig: PredatorsConfigInterface[],
    protectorsConfig: ProtectorsConfigInterface[],
  ): Dice[] {
    const firstDice = new Dice();
    const secondDice = new Dice();
    for (const animal of [
      ...livestockConfig,
      ...predatorsConfig,
      ...protectorsConfig,
    ]) {
      if (!animal.dice) {
        continue;
      }
      animal.dice.forEach(({ diceNumber, probability }) => {
        switch (diceNumber) {
          case 1:
            firstDice.addSide(animal.name, probability);
            break;
          case 2:
            secondDice.addSide(animal.name, probability);
            break;
          default:
            throw Error(`Error: Unknown dice number: ${diceNumber}`);
        }
      });
    }
    return [firstDice, secondDice];
  }
}
