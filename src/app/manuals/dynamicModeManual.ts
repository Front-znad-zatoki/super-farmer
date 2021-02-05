import { Predator } from '../../Animals/Predator';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { PredatorsConfigInterface } from '../../Interfaces/PredatorsConfigInterface';
import { Game } from '../logic/Game';

export function logGameObject(): void {
  const gra = new Game();
  console.log(gra);
  gra.theCurrentPlayer.theHerd.addAnimalsToHerd(
    AnimalNames.RABBIT,
    10,
  );
  gra.theCurrentPlayer.theHerd.addAnimalsToHerd(
    AnimalNames.BIG_DOG,
    1,
  );
  gra.theCurrentPlayer.theHerd.cullAnimals(
    new Predator(
      mockWolf.name,
      mockWolf.path,
      undefined,
      mockWolf.kills,
      mockWolf.isChasedAwayBy,
      mockWolf.exclamation,
    ),
  );
}

const mockWolf: PredatorsConfigInterface = {
  name: AnimalNames.WOLF,
  path: '/static/images/avatars/wolf.png',
  kills: [
    AnimalNames.RABBIT,
    AnimalNames.SHEEP,
    AnimalNames.PIG,
    AnimalNames.COW,
  ],
  isChasedAwayBy: AnimalNames.BIG_DOG,
  exclamation: 'Auuuuuu!Grrrrr!',
  // dice: [{ diceNumber: 2, probability: 1 }],
};
