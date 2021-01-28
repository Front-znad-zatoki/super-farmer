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
   * Looks for element by the query in the DOM and injects children into.
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
      throw new Error(`Not found element by query '${query}'`);
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

  /**
   * Argument can be parent element as HTMLElement or query as string.
   * In case of HTMLElement it removes all it's children.
   * In case of string it looks for element by it with .querySelector in the DOM and removes all it's children.
   */
  static removeAllChildren = (parent: HTMLElement | string): void => {
    if (parent instanceof HTMLElement) {
      parent.textContent = '';
      return;
    }
    const parentElem = document.querySelector(parent);
    if (!parentElem) {
      throw new Error(`Not found element by query '${parent}'`);
    }
    parentElem.textContent = '';
  };

  /**
   * Looks for element by given query in the DOM and removes it.
   */
  static removeElement = (query: string): void => {
    const el = document.querySelector(query);
    if (!el) {
      throw new Error(`Not found element by query '${query}'`);
    }
    el.remove();
  };
}
