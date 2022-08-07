export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = document.#containerEl.querySelector("#switch");
    this.#fontSelectEl = document.#containerEl.querySelector("#font");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
  }

  #onChangeTheme(event) {
    // console.log(event.target.checked);
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    // console.log(event.target.value);
    document.body.style.fontFamily = event.target.value;
  }
}
