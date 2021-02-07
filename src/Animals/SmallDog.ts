import { Render } from '../app/utils/Render';
import { AnimalNames } from '../Enums/AnimalNamesEnum';
import { AnimalRoles } from '../Enums/AnimalRolesEnum';
import { ProtectHerdInterface } from '../Interfaces/ProtectHerdInterface';
import { Animal } from './Animal';

export class SmallDog extends Animal implements ProtectHerdInterface {
  constructor() {
    super(
      AnimalNames.SMALL_DOG,
      './static/images/avatars/dog.png',
      6,
      AnimalRoles.GUARDIAN,
    );
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
        className: 'exclamation',
      },
      exclamation,
    );
    try {
      Render.render('#sf-app', div);
    } catch (err) {
      console.log(err.message);
    }

    // setTimeout(() => Render.removeElement(`#${id}`), 6000);
  }
}
