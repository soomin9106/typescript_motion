import { BaseComponent, Component } from "./../component.js";

// 모아서 조립하고 묶는다.
export interface Composable {
  addChild(child: Component): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
  constructor() {
    super(`<li class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
          </li>`);
  }

  // 외부에서 item 전달
  addChild(child: Component): void {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
  constructor() {
    super(`<ul class="page"></ul>`);
  }

  addChild(section: Component): void {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
  }
}
