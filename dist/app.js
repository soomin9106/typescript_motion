import { InputDialog } from "./components/dialog/dialog.js";
import { ImageComponent } from "./components/page/item/image.js";
import { VideoCompoent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        const image = new ImageComponent("https://picsum.photos/100/100", "test image");
        this.page.addChild(image);
        const video = new VideoCompoent("https://youtu.be/fYmMZjlfdWg", "New Video");
        this.page.addChild(video);
        this.bindElementToDialog('#new_image');
    }
    bindElementToDialog(selector) {
        const btn = document.querySelector(selector);
        btn.addEventListener('click', () => {
            const dialog = new InputDialog();
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.attachTo(this.dialogRoot);
        });
    }
}
new App(document.querySelector(".document"), document.body);
