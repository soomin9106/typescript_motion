import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";

class App {
  private readonly page: PageComponent;
  private readonly image: ImageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    this.image = new ImageComponent("https://picsum.photos/100/100", "test image")
    this.image.attachTo(appRoot);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
