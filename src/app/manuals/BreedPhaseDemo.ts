import { Player } from '../../Player';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { BreedProcessor } from '../BreedProcessor';

export class BreedPhaseDemo {
  static playDemo(): void {
    const bank = new Player('bank');
    bank.theHerd.addAnimals(AnimalNames.RABBIT, 10);
    bank.theHerd.addAnimals(AnimalNames.SHEEP, 10);
    bank.theHerd.addAnimals(AnimalNames.PIG, 10);
    bank.theHerd.addAnimals(AnimalNames.COW, 12);
    bank.theHerd.addAnimals(AnimalNames.HORSE, 4);
    bank.theHerd.addAnimals(AnimalNames.SMALL_DOG, 4);
    bank.theHerd.addAnimals(AnimalNames.BIG_DOG, 2);
    const bp = new BreedProcessor(bank);
    const player = new Player('player');
    for (let i = 0; i < 10; i++) {
      bp.processBreedPhase(player);
    }
    console.log(bank.theHerd);
    console.log(player.theHerd);
  }
}
