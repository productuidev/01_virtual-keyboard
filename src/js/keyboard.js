export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    // prevent
    if (this.#keyPress) return;
    this.#mouseDown = false;

    const keyEl = event.target.closest("div.key"); // key element 가져오고
    const isActive = !!keyEl?.classList.contains("active"); // optional chaining, !undefined (true) !!undefined (false) (boolean으로 type casting), active 유무
    const val = keyEl?.dataset.val; // key val 확인

    // mouse로 누른 key를 input에 입력되게
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val; // 원래 가지고 있던 value에 val을 넣는다
    }
    // Space
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    // Backspace (마지막 String을 잘라내기)
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    // prevent
    if (this.#keyPress) return;
    this.#mouseDown = true;

    event.target.closest("div.key")?.classList.add("active");
  }

  #onInput(event) {
    // console.log(event.target.value);
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onKeyDown(event) {
    // prevent
    if (this.#mouseDown) return;
    this.#keyPress = true;

    // console.log("keydown");
    // console.log(event.code);
    // console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key));
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );

    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active"); // optional chaining
  }

  #onKeyUp(event) {
    // prevent
    if (this.#mouseDown) return;
    this.#keyPress = false;

    // console.log("keyup");
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active"); // optional chaining
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
