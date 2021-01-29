import { Render } from '../app/utils/Render';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';

export class SmallDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(AnimalNames.SMALL_DOG, 6, AnimalRoles.GUARDIAN);
  }

  // TODO: implement when herd is ready
  protectHerd(): string {
    const exclamation = `${this.name}: Woof! Woof! I'm protecting all rabbits in the herd! Woof! Woof!`;
    SmallDog.showExclamationInTheView(
      exclamation,
      `${this.name.split(' ').join('')}`,
    );
    return exclamation;
  }

  // TODO: for presentantion purposes, to removed after first sprint
  static showExclamationInTheView(
    exclamation: string,
    id: string,
  ): void {
    const div = Render.elementFactory(
      'div',
      {
        id: id,
        style:
          'color: green; font-size: 28px; font-weight: bold; border: 5px dotted red; margin: 10px; padding: 10px;',
      },
      exclamation,
    );
    try {
      Render.render('#sf-app', div);
    } catch (err) {
      console.log(err.message);
    }

    setTimeout(() => Render.removeElement(`#${id}`), 6000);
  }
}
