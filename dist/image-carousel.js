var a = Object.defineProperty;
var l = (o, t, e) => t in o ? a(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var i = (o, t, e) => (l(o, typeof t != "symbol" ? t + "" : t, e), e);
const h = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"/></svg>', u = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"/></svg>', d = {
  autoplay: !0,
  transitionDuration: 0.3,
  autoplayInterval: 3,
  loop: !0
};
class p {
  constructor(t, e) {
    i(this, "root");
    i(this, "itemsCount");
    i(this, "ElementsReference", {});
    i(this, "currentIndex", 0);
    i(this, "rootWidth");
    i(this, "userOptions");
    i(this, "intervalId", null);
    i(this, "timeoutID", null);
    this.userOptions = { ...d, ...e }, this.root = t;
    const s = Array.from(this.root.children);
    this.root.innerHTML = "", this.rootWidth = this.root.offsetWidth, this.root.style.overflow = "hidden", this.root.style.position = "relative", this.itemsCount = s.length;
    const n = document.createElement("div");
    n.className = "image-carousel__container", n.style.width = `${this.rootWidth * this.itemsCount}px`, this.ApplyTransition(n), s.forEach((r) => {
      n.appendChild(r), r.style.width = `${this.rootWidth}px`;
    }), this.root.appendChild(n), this.ElementsReference = {
      carouselContainer: n,
      rootChildren: s
    }, window.addEventListener("resize", () => this.HandleResize()), this.userOptions.autoplay && this.StartAutoplay(), this.initArrows();
  }
  initArrows() {
    const t = document.createElement("button"), e = document.createElement("button");
    t.className = "image-carousel__prev-btn", e.className = "image-carousel__next-btn", t.innerHTML = h, e.innerHTML = u, t.addEventListener("click", () => this.PreviousPage()), e.addEventListener("click", () => this.NextPage()), this.root.appendChild(t), this.root.appendChild(e);
  }
  StartAutoplay() {
    this.intervalId || (this.intervalId = setInterval(() => {
      this.NextPage();
    }, this.userOptions.autoplayInterval * 1e3));
  }
  StopAutoplay() {
    this.intervalId && (clearInterval(this.intervalId), this.intervalId = null);
  }
  SetTransformOffset() {
    const t = this.ElementsReference.carouselContainer;
    t.style.transform = `translateX(-${this.currentIndex * this.rootWidth}px)`;
  }
  NextPage() {
    const t = this.currentIndex === this.itemsCount - 1;
    if (!this.userOptions.loop && this.userOptions.autoplay && this.intervalId && // To prevent blocking user from pressing the next button.
    t) {
      this.StopAutoplay();
      return;
    }
    t ? this.currentIndex = 0 : this.currentIndex += 1, this.SetTransformOffset();
  }
  PreviousPage() {
    this.currentIndex === 0 ? this.currentIndex = this.itemsCount - 1 : this.currentIndex -= 1, this.SetTransformOffset();
  }
  HandleResize() {
    this.rootWidth = this.root.offsetWidth;
    const t = this.ElementsReference.carouselContainer;
    t.style.width = `${this.rootWidth * this.itemsCount}px`, this.RemoveTransition(), this.SetTransformOffset(), this.ElementsReference.rootChildren.forEach((s) => {
      s.style.width = `${this.rootWidth}px`;
    }), this.timeoutID && clearTimeout(this.timeoutID), this.timeoutID = setTimeout(() => {
      this.ApplyTransition();
    }, 300);
  }
  ApplyTransition(t) {
    let e;
    t ? e = t : e = this.ElementsReference.carouselContainer;
    const s = this.userOptions.transitionDuration * 1e3;
    e.style.transition = `transform ${s}ms ease-in-out`;
  }
  RemoveTransition(t) {
    let e;
    t ? e = t : e = this.ElementsReference.carouselContainer, e.style.transition = "";
  }
}
export {
  p as default
};
