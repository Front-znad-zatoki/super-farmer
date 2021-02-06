import { Animal } from '../../Animals/Animal';
import { Rabbit } from '../../Animals/Rabbit';
import { Sheep } from '../../Animals/Sheep';
import { Pig } from '../../Animals/Pig';
import { Cow } from '../../Animals/Cow';
import { Horse } from '../../Animals/Horse';
import { Fox } from '../../Animals/Fox';
import { Wolf } from '../../Animals/Wolf';
import { SmallDog } from '../../Animals/SmallDog';
import { BigDog } from '../../Animals/BigDog';
import { AnimalNames } from '../../Enums/AnimalNamesEnum';
import { Render } from './Render';

export class ConvertAnimalName {
  static toAnimalObject(name: string): Animal {
    switch (name) {
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
      case AnimalNames.FOX:
        return new Fox();
      case AnimalNames.WOLF:
        return new Wolf();
      default:
        throw Error(`Animal name is unknown: ${name}`);
    }
  }

  static toHTMLElement(name: string, className: string): HTMLElement {
    const animal = ConvertAnimalName.toAnimalObject(name);
    return Render.elementFactory('img', {
      className: className,
      alt: animal.theName.toLowerCase(),
      src: `${animal.theImagePath}`,
    });
  }
}
