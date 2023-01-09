import { BaseComponent } from "./../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(url: string, title: string) {
    super(`<section class="image">
      <div class="img__holder">
          <img src="" alt="" class="img__thumbnail">
      </div>
      <h2 class="page-item__title img__title"></p>
    </section>`);

    const imageElement = this.element.querySelector(
      ".img__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".img__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}

/** My Code */
// private imgElement: HTMLImageElement;
// private titleElement: HTMLParagraphElement;
// this.element = document.createElement("section");

// this.imgElement = document.createElement("img");
// this.imgElement.setAttribute("src", url);

// this.titleElement = document.createElement("p");
// this.titleElement.setAttribute("class", "img-title");
// this.titleElement.textContent = title;

// this.element.appendChild(this.imgElement);
// this.element.appendChild(this.titleElement);

/** Using Template */
// const template = document.createElement("template");
//     template.innerHTML = `<section class="image">
//       <div class="img__holder">
//           <img src="" alt="" class="img__thumbnail">
//       </div>
//       <p class="img__title"></p>
//     </section>`;

//     this.element = template.content.firstElementChild! as HTMLElement;

//     const imageElement = this.element.querySelector('.img__thumbnail')! as HTMLImageElement;
//     imageElement.src = url;
//     imageElement.alt = title;

//     const titleElement = this.element.querySelector('.img__title')! as HTMLParagraphElement;
//     titleElement.textContent = title;
