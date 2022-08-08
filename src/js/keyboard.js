export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", (event) => {
      // console.log("keydown");
      // console.log(event.code);
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active"); // optional chaining
    });
    document.addEventListener("keyup", (event) => {
      // console.log("keyup");
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active"); // optional chaining
    });
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
