import { ImageComponent } from "./components/page/item/image.js";
import { VideoCompoent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent("https://picsum.photos/100/100", "test image");
        this.page.addChild(image);
        const video = new VideoCompoent("https://youtu.be/fYmMZjlfdWg", "New Video");
        this.page.addChild(video);
    }
}
new App(document.querySelector(".document"));
