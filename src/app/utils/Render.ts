export class Render {
  /**
   * Injects children into parentElem.
   */
  static childrenInjector = (
    parentElem: Element,
    ...children: (HTMLElement | string)[]
  ): void =>
    children.forEach((child) => {
      if (typeof child === 'string') {
        parentElem.appendChild(document.createTextNode(child));
      } else {
        parentElem.appendChild(child);
      }
    });

  /**
   * Looking for element by the query in the DOM and injects children into.
   * Throws an Error when element is not found.
   */
  static render = (
    query: string,
    ...children: (HTMLElement | string)[]
  ): void => {
    if (children.length === 0 || !query) {
      throw new Error(
        'Required query and at least one child in arguments',
      );
    }
    const parentElem = document.querySelector(query);

    if (!parentElem) {
      throw new Error(`Not found element by query ${query}`);
    }

    Render.childrenInjector(parentElem, ...children);
  };

  /**
   * Creates and returns HTMLElement with given arguments.
   */
  static elementFactory = (
    tag: string,
    attributes: Record<string, string> = {},
    ...children: (HTMLElement | string)[]
  ): HTMLElement => {
    const newElement = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        const classes = value.trim().split(' ');
        newElement.classList.add(...classes);
      } else {
        newElement.setAttribute(key, value);
      }
    });

    Render.childrenInjector(newElement, ...children);

    return newElement;
  };
}
