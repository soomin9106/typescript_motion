import { Composable } from "../page/page.js";
import { BaseComponent, Component } from "./../component.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor() {
    super(`<dialog class="dialog">
        <div class="dialog__container">
          <button class="close">&times;</button>
          <div id="dialog__body"></div>
          <button class="dialog__submit">ADD</button>
        </div>
      </dialog>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener(); // closeListener 가 있다면 실행함
    };

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener(); // submitListener 가 있다면 실행함
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component): void {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
