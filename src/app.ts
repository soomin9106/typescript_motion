import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoCompoent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

class App {
  private readonly page: Component & Composable
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent("https://picsum.photos/100/100", "test image");
    this.page.addChild(image);

    const video = new VideoCompoent("https://youtu.be/fYmMZjlfdWg", "New Video");
    this.page.addChild(video);

    this.bindElementToDialog('#new_image');
  }

  private bindElementToDialog(selector: string) {
    const btn = document.querySelector(selector)! as HTMLButtonElement;
    btn.addEventListener('click', () => {      
      const dialog = new InputDialog();

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.attachTo(this.dialogRoot);
    })
  }

}

new App(document.querySelector(".document")! as HTMLElement, document.body);
