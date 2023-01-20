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
          <button class="close"><i class="fa-solid fa-x"></i></button>
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

export class EditDialog extends BaseComponent<HTMLElement>{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor(beforeTitle: string) {
    super(`<dialog class="dialog">
        <div class="dialog__container">
          <button class="close"><i class="fa-solid fa-x"></i></button>
          <div id="dialog__body">
            <div class="form__container">
              <label for="title">Title</label>
              <input type="text" id="title" class="edit__title" value="${beforeTitle}" />
      </div>
          </div>
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

  getValue() {
    const valueElement = this.element.querySelector('.edit__title') as HTMLInputElement | null
    if(valueElement !== null) {
      return valueElement.value;
    } else {
      return ""
    }
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  } 

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}
