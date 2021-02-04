import { Player } from '../../Player';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { BreedProcessor } from '../BreedProcessor';
import { mockPredatorConfig } from './mockPredatorConfig';

export class BreedPhaseDemo {
  static playDemo(): void {
    const bank = new Player('bank');
    bank.theHerd.addAnimalsToHerd(AnimalNames.RABBIT, 10);
    bank.theHerd.addAnimalsToHerd(AnimalNames.SHEEP, 10);
    bank.theHerd.addAnimalsToHerd(AnimalNames.PIG, 10);
    bank.theHerd.addAnimalsToHerd(AnimalNames.COW, 12);
    bank.theHerd.addAnimalsToHerd(AnimalNames.HORSE, 4);
    bank.theHerd.addAnimalsToHerd(AnimalNames.SMALL_DOG, 4);
    bank.theHerd.addAnimalsToHerd(AnimalNames.BIG_DOG, 2);
    const bp = new BreedProcessor(bank, mockPredatorConfig);
    const player = new Player('player');
    for (let i = 0; i < 10; i++) {
      bp.processBreedPhase(player);
    }
    console.log(bank.theHerd);
    console.log(player.theHerd);
  }
}
