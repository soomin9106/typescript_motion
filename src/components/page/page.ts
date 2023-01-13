import { BaseComponent, Component } from "./../component.js";

// 모아서 조립하고 묶는다.
export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(mode: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer; // 생성자 호출 => SectionContainer
};

type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void; // 내가 누군지, drag state 는 무엇인지

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener; // callback from outside
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`<li draggable=true class="page-item">
              <section class="page-item__body"></section>
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
          </li>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener(); // closeListener 가 있다면 실행함
    };

    this.element.addEventListener("dragstart", (event: DragEvent) => {
      this.onDragStart(event);
    });

    this.element.addEventListener("dragend", (event: DragEvent) => {
      this.onDragEnd(event);
    });

    this.element.addEventListener("dragenter", (event: DragEvent) => {
      this.onDragEnter(event);
    });

    this.element.addEventListener("dragleave", (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  onDragStart(event: DragEvent): void {
    this.notifyDragObservers("start");
    this.element.classList.add("lifted");
  }

  onDragEnd(event: DragEvent): void {
    this.notifyDragObservers("stop");
    this.element.classList.remove("lifted");
  }

  onDragEnter(event: DragEvent): void {
    this.notifyDragObservers("enter");
    this.element.classList.add("drop-area");
  }

  onDragLeave(event: DragEvent): void {
    this.notifyDragObservers("leave");
    this.element.classList.remove("drop-area");
  }

  // 외부에서 item 전달
  addChild(child: Component): void {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener): void {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(mode: "mute" | "unmute"): void {
      if(mode === "mute"){
        this.element.classList.add('mute-children');
      } else {
        this.element.classList.remove('mute-children');
      }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  onDropped(): void {
      this.element.classList.remove('drop-area');
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;
  private children = new Set<SectionContainer>();

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener("dragover", (event: DragEvent) => {
      this.onDragOver(event);
    });

    this.element.addEventListener("drop", (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    console.log("dragover", event);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log("drop", event);
    // 위치 변경 해주기
    if(!this.dropTarget) {
      return;
    }

    if(this.dragTarget && this.dragTarget !== this.dropTarget){
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();

      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
    }

    this.dropTarget.onDropped()
  }

  addChild(section: Component): void {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });

    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
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
      }
    );
  }

  private updateSection(mode: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(mode);
    })
  }
}
