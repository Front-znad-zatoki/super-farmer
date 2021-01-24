export class Render {
  static childrenInjector = (parentElem: Element, children: (Element|string)[]) =>
    children.forEach((child) => {
      if (typeof child === 'string') {
        parentElem.appendChild(document.createTextNode(child));
      } else {
        parentElem.appendChild(child);
      }
    });

  static render = (query: string, ...children: (Element|string)[]) => {
    if (children.length === 0 || !query) {
      throw new Error(
        'Required query and at least one child in arguments',
      )
    }
    const parentElem = document.querySelector(query);

    if (!parentElem) {
      throw new Error(`Not found element by query ${query}`);
    }

    Render.childrenInjector(parentElem, children);
  };

  static elementFactory = (tag: string, attributes: object, ...children: (Element|string)[]): HTMLElement => {
    const newElement = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        newElement.classList.add(...value.trim().split(' '));
      } else {
        newElement.setAttribute(key, value);
      }
    });

    Render.childrenInjector(newElement, children);

    return newElement;
  };
}
