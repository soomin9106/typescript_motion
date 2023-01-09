import { InputDialog, } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoCompoent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog("#new-note", TextSectionInput, (input) => new NoteComponent(input.title, input.body));
        this.bindElementToDialog("#new-todo", TextSectionInput, (input) => new TodoComponent(input.title, input.body));
        this.bindElementToDialog("#new-image", MediaSectionInput, (input) => new ImageComponent(input.url, input.title));
        this.bindElementToDialog("#new-video", MediaSectionInput, (input) => new VideoCompoent(input.url, input.title));
        this.page.addChild(new ImageComponent('https://picsum.photos/800/400', 'Image Title'));
        this.page.addChild(new VideoCompoent('https://youtu.be/D7cwvvA7cP0', 'Video Title'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
        this.page.addChild(new ImageComponent('https://picsum.photos/800/400', 'Image Title'));
        this.page.addChild(new VideoCompoent('https://youtu.be/D7cwvvA7cP0', 'Video Title'));
        this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
        this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const btn = document.querySelector(selector);
        btn.addEventListener("click", () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.attachTo(this.dialogRoot);
        });
    }
}
new App(document.querySelector(".document"), document.body);
