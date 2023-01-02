import { BaseComponent } from "../../component.js";

export class VideoCompoent extends BaseComponent<HTMLElement> {
  constructor(url: string, title: string) {
    super(`<section class="video">
        <div class="video__player"><iframe class="video__iframe"></iframe></div>
        <h3 class="page-item__title video__title"></h3>
    </section>`);

    const iframeElement = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;
    iframeElement.src = this.convertUrl(url);

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // 내부적으로 쓰이는 함수
  // Regex 사용
  private convertUrl(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if(videoId) {
        return `https://www.youtube.com/embed/${videoId}`
    }
    return url;
  }
}

