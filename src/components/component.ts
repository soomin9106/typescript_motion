export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
  getTitle(): string;
}

/** Encapsulate the HTML element creation */
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }
  getTitle(): string {
    return this.element.querySelector('.page-item__title')?.innerHTML as string
  }
  attach(component: Component, position?: InsertPosition): void {
    component.attachTo(this.element, position);
  }
  removeFrom(parent: HTMLElement): void {
    parent.removeChild(this.element);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
