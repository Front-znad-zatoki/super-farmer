import { Animal } from '../../Animals/Animal';
import { BigDog } from '../../Animals/BigDog';
import { Cow } from '../../Animals/Cow';
import { Horse } from '../../Animals/Horse';
import { Pig } from '../../Animals/Pig';
import { Rabbit } from '../../Animals/Rabbit';
import { Sheep } from '../../Animals/Sheep';
import { SmallDog } from '../../Animals/SmallDog';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';

export class ConvertToAnimalObject {
  /**
   * Method that creates animal object based on animal name
   * @param animal takes AnimalName
   * @returns Animal object with corresponding instace
   */
  static convertToAnimalObject(animal: AnimalNames): Animal {
    switch (animal) {
      case AnimalNames.RABBIT:
        return new Rabbit();
      case AnimalNames.SHEEP:
        return new Sheep();
      case AnimalNames.PIG:
        return new Pig();
      case AnimalNames.COW:
        return new Cow();
      case AnimalNames.HORSE:
        return new Horse();
      case AnimalNames.SMALL_DOG:
        return new SmallDog();
      case AnimalNames.BIG_DOG:
        return new BigDog();
      default:
        throw Error(`Animal name is unknown: ${animal}`);
    }
  }
}
