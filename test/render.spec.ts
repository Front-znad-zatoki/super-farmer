import { Render } from '../src/app/utils/Render';

describe('Does childrenInjector injects children into parentElem', function () {
  it('Should inject p into div', function () {
    const parentElem = document.createElement('div');
    const child = document.createElement('p');
    Render.childrenInjector(parentElem, child);
    expect(parentElem.children[0].tagName.toLowerCase()).toBe('p');
  });

  it('Should inject p and button into div', function () {
    const parentElem = document.createElement('div');
    const firstChild = document.createElement('p');
    const secondChild = document.createElement('button');
    Render.childrenInjector(parentElem, firstChild, secondChild);
    expect(parentElem.children[0].tagName.toLowerCase()).toBe('p');
    expect(parentElem.children[1].tagName.toLowerCase()).toBe(
      'button',
    );
  });

  const test = 'test';
  it(`Should inject '${test}' string into div`, function () {
    const parentElem = document.createElement('div');
    Render.childrenInjector(parentElem, test);
    expect(parentElem.textContent).toBe(test);
  });
});

describe('Does elementFactory returns correct element', function () {
  it('Should return div with class work', function () {
    const example = Render.elementFactory('div', {
      className: 'work',
    });
    expect(example.classList[0]).toBe('work');
  });

  it('Should return span with class monkey', function () {
    const example = Render.elementFactory('span', {
      className: 'monkey',
    });
    expect(example.classList[0]).toBe('monkey');
  });

  it('Should return div with classes cow and boy', function () {
    const example = Render.elementFactory('div', {
      className: 'cow boy',
    });
    expect(example.classList[0]).toBe('cow');
    expect(example.classList[1]).toBe('boy');
  });

  const href = 'http://example.com';
  it(`Should return div with classes cow and boy, and should have href atribute with value ${href}`, function () {
    const example = Render.elementFactory('div', {
      className: 'cow boy',
      href: 'http://example.com',
    });
    expect(example.classList[0]).toBe('cow');
    expect(example.classList[1]).toBe('boy');
    expect(example.hasAttribute('href')).toBe(true);
    expect(example.hasAttribute('zupa')).toBe(false);
    expect(example.getAttribute('href')).toBe('http://example.com');
  });

  describe('removeAllChildren', function () {
    it('should remove all children from the given HTMLElement', function () {
      const parentElement = Render.elementFactory(
        'div',
        {},
        'zupa',
        Render.elementFactory('p'),
        Render.elementFactory('p'),
        'z trupa',
        Render.elementFactory('div', {}, Render.elementFactory('h1')),
      );
      Render.removeAllChildren(parentElement);
      expect(parentElement.hasChildNodes()).toBe(false);
    });
  });
});
