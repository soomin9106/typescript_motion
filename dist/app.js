import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoCompoent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent("https://picsum.photos/100/100", "test image");
        this.image.attachTo(appRoot);
        this.note = new NoteComponent("First Note", "To testing motion");
        this.note.attachTo(appRoot, 'beforeend');
        this.todo = new TodoComponent("First Todo", "make motion");
        this.todo.attachTo(appRoot, 'beforeend');
        this.video = new VideoCompoent("https://youtu.be/fYmMZjlfdWg", "New Video");
        this.video.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector(".document"));
