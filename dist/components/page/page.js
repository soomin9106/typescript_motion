import { EditDialog } from "../dialog/dialog.js";
import { BaseComponent } from "./../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li draggable=true class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="close"><i class="fa-solid fa-x"></i></button>
              </div>
          </li>`);
        const closeBtn = this.element.querySelector(".close");
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener(); // closeListener 가 있다면 실행함
        };
        const editBtn = this.element.querySelector(".edit");
        editBtn.onclick = () => {
            this.editListener && this.editListener(); // editListener 가 있다면 실행함
        };
        this.element.addEventListener("dragstart", (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener("dragend", (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener("dragenter", (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener("dragleave", (event) => {
            this.onDragLeave(event);
        });
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    onDragStart(event) {
        this.notifyDragObservers("start");
        this.element.classList.add("lifted");
    }
    onDragEnd(event) {
        this.notifyDragObservers("stop");
        this.element.classList.remove("lifted");
    }
    onDragEnter(event) {
        this.notifyDragObservers("enter");
        this.element.classList.add("drop-area");
    }
    onDragLeave(event) {
        this.notifyDragObservers("leave");
        this.element.classList.remove("drop-area");
    }
    // 외부에서 item 전달
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnEditListener(listener) {
        this.editListener = listener;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    muteChildren(mode) {
        if (mode === "mute") {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
    onDropped() {
        this.element.classList.remove('drop-area');
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.element.addEventListener("dragover", (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener("drop", (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
        // console.log("dragover", event);
    }
    onDrop(event) {
        event.preventDefault();
        // console.log("drop", event);
        // 위치 변경 해주기
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, "beforeend");
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        item.setOnEditListener(() => {
            // edit event 실행
            const beforeTitle = item.getTitle();
            console.log(beforeTitle);
            const editDialog = new EditDialog(beforeTitle);
            editDialog.attachTo(document.body);
            editDialog.setOnCloseListener(() => {
                editDialog.removeFrom(document.body);
            });
            editDialog.setOnSubmitListener(() => {
                // edit title here!
            });
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
            switch (state) {
                case "start":
                    this.dragTarget = target;
                    this.updateSection('mute');
                    break;
                case "stop":
                    this.dragTarget = undefined;
                    this.updateSection('unmute');
                    break;
                case "enter":
                    this.dropTarget = target;
                    break;
                case "leave":
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
        });
    }
    updateSection(mode) {
        this.children.forEach((section) => {
            section.muteChildren(mode);
        });
    }
}
