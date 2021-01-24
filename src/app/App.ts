import { Render } from './utils/Render';

class App {
  _init() {
    console.log('start');

    const example = Render.elementFactory(
      'div',
     { className: 'example-class-name' }
     );
     console.log(example);
  }
}
