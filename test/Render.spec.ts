import { Render } from '../src/app/utils/Render';

describe('Does elementFactory returns correct element', function () {
  it('Should return div with class work', function () {
    const example = Render.elementFactory(
      'div',
     { className: 'work' }
     );
    expect(example.classList[0]).toBe('work');
  });

  it('Should return span with class monkey', function () {
    const example = Render.elementFactory(
      'span',
     { className: 'monkey' }
     );
    expect(example.classList[0]).toBe('monkey');
  });

  it('Should return div with classes cow and boy', function () {
    const example = Render.elementFactory(
      'div',
     { className: 'cow boy' }
     );
    expect(example.classList[0]).toBe('cow');
    expect(example.classList[1]).toBe('boy');
  });
});
