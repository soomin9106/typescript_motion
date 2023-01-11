import { BaseComponent } from "./../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li draggable=true class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
          </li>`);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener(); // closeListener 가 있다면 실행함
        };
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener('dragenter', (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event) => {
            this.onDragLeave(event);
        });
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    onDragStart(event) {
        this.notifyDragObservers('start');
        this.element.classList.add('lifted');
    }
    onDragEnd(event) {
        this.notifyDragObservers('stop');
        this.element.classList.remove('lifted');
    }
    onDragEnter(event) {
        this.notifyDragObservers('enter');
        this.element.classList.add('drop-area');
    }
    onDragLeave(event) {
        this.notifyDragObservers('leave');
        this.element.classList.remove('drop-area');
    }
    // 외부에서 item 전달
    addChild(child) {
        const container = this.element.querySelector('.page-item__body');
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
        console.log('dragover', event);
    }
    onDrop(event) {
        event.preventDefault();
        console.log('drop', event);
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
        item.setOnDragStateListener((target, state) => {
            console.log(target, state);
        });
    }
}
