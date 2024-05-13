import './ImageCarousel.css';
import ArrowLeft from './assets/leftArrow';
import ArrowRight from './assets/rightArrow';

type Options = {
  /** @param {boolean} autoplay If true, the carousel will switch images automatically. Default is true */
  autoplay: boolean;
  /** @param {number} transitionDuration How fast the transition of changing images should be. Measured in seconds. Default is 0.3s. It's recommended to keep it lower than autoplayInterval */
  transitionDuration: number;
  /** @param {number} autoplayInterval The interval between switching images. Measured in seconds. Default is 3s. It's recommended to keep it higher than transitionDuration */
  autoplayInterval: number;
  /** @param {boolean} loop If true, the carousel will loop back to the first image after reaching the last image. Default is true */
  loop: boolean;
};

const defaultOptions: Options = {
  autoplay: true,
  transitionDuration: 0.3,
  autoplayInterval: 3,
  loop: true,
};

class ImageCarousel {
  private root: HTMLElement;

  private itemsCount: number;

  private ElementsReference: Record<string, HTMLElement | HTMLElement[]> = {};

  private currentIndex: number = 0;

  private rootWidth: number;

  private userOptions: Options;

  private intervalId: NodeJS.Timeout | null = null;

  private timeoutID: NodeJS.Timeout | null = null;

  private navigationDots: HTMLElement[] = [];

  constructor(root: HTMLElement, options?: Partial<Options>) {
    this.userOptions = { ...defaultOptions, ...options };

    this.root = root;

    // Still don't understand why HTMLCollection doesn't have a built in .forEach() method.
    const rootChildren = Array.from(this.root.children) as HTMLElement[];

    // We want the width of the root element before being interfered by the items.
    // Hence we clear the root element before storing its width.
    this.root.innerHTML = '';
    this.rootWidth = this.root.offsetWidth;

    this.root.style.overflow = 'hidden';
    this.root.style.position = 'relative';

    this.itemsCount = rootChildren.length;

    const carouselContainer = document.createElement<'div'>('div');
    carouselContainer.className = 'image-carousel__container';
    carouselContainer.style.width = `${this.rootWidth * this.itemsCount}px`;
    this.ApplyTransition(carouselContainer);

    rootChildren.forEach((child) => {
      carouselContainer.appendChild(child);
      child.style.width = `${this.rootWidth}px`;
    });

    this.root.appendChild(carouselContainer);

    this.ElementsReference = {
      carouselContainer,
      rootChildren,
    };

    window.addEventListener('resize', () => this.HandleResize());

    if (this.userOptions.autoplay) this.StartAutoplay();

    this.initArrows();
    this.InitNavigationDots();
  }

  private initArrows() {
    const prevButton = document.createElement<'button'>('button');
    const nextButton = document.createElement<'button'>('button');

    prevButton.className = 'image-carousel__prev-btn';
    nextButton.className = 'image-carousel__next-btn';

    prevButton.innerHTML = ArrowLeft;
    nextButton.innerHTML = ArrowRight;

    prevButton.addEventListener('click', () => this.PreviousPage());
    nextButton.addEventListener('click', () => this.NextPage());

    this.root.appendChild(prevButton);
    this.root.appendChild(nextButton);
  }

  private InitNavigationDots() {
    const navigationDots = document.createElement<'div'>('div');

    navigationDots.className = 'image-carousel__navigation-dots--container';

    for(let i = 0; i < this.itemsCount; i += 1) {
      const dot = document.createElement<'div'>('div');
      dot.className = 'image-carousel__navigation-dot';

      if (i === this.currentIndex) dot.classList.add('active');

      this.navigationDots.push(dot);
      dot.addEventListener("click", () => {
        this.currentIndex = i;
        this.UpdateNavigationDots();
        this.SetTransformOffset();
      });

      navigationDots.appendChild(dot);
    }

    this.root.appendChild(navigationDots);
  }

  private UpdateNavigationDots() {
    this.navigationDots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  public StartAutoplay() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.NextPage();
    }, this.userOptions.autoplayInterval * 1000);
  }

  public StopAutoplay() {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private SetTransformOffset() {
    const container = this.ElementsReference.carouselContainer as HTMLElement;
    container.style.transform = `translateX(-${this.currentIndex * this.rootWidth}px)`;
  }

  public NextPage() {
    const isLastItem = this.currentIndex === this.itemsCount - 1;
    const shouldStopAutoplay =
      !this.userOptions.loop &&
      this.userOptions.autoplay &&
      this.intervalId && // To prevent blocking user from pressing the next button.
      isLastItem;

    if (shouldStopAutoplay) {
      this.StopAutoplay();
      return;
    }

    if (isLastItem) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }

    this.SetTransformOffset();
    this.UpdateNavigationDots();
  }

  public PreviousPage() {
    const isFirstItem = this.currentIndex === 0;

    if (isFirstItem) {
      this.currentIndex = this.itemsCount - 1;
    } else {
      this.currentIndex -= 1;
    }

    this.SetTransformOffset();
    this.UpdateNavigationDots();
  }

  private HandleResize() {
    // Update the width of the root element.
    this.rootWidth = this.root.offsetWidth;
    const container = this.ElementsReference.carouselContainer as HTMLElement;

    container.style.width = `${this.rootWidth * this.itemsCount}px`;

    // Since we are using translateX() to switch between items,
    // while we are resizing, in order to keep everything in sync,
    // we want to update the transform offset of the container as well.
    // But since it has a transition applied on it, it will cause some weird
    // visual quirkness while changing items especially when autoplay is on.
    // Hence we remove the transition and reapply it later.
    this.RemoveTransition();
    this.SetTransformOffset();

    const rootChildren = this.ElementsReference.rootChildren as HTMLElement[];
    rootChildren.forEach((child) => {
      child.style.width = `${this.rootWidth}px`;
    });

    // Reapply the transition.
    if (this.timeoutID) clearTimeout(this.timeoutID);

    this.timeoutID = setTimeout(() => {
      this.ApplyTransition();
    }, 300);
  }

  private ApplyTransition(element?: HTMLElement) {
    let container;
    if (!element) {
      container = this.ElementsReference.carouselContainer as HTMLElement;
    } else {
      container = element;
    }

    const duration = this.userOptions.transitionDuration * 1000;

    container.style.transition = `transform ${duration}ms ease-in-out`;
  }

  private RemoveTransition(element?: HTMLElement) {
    let container;
    if (!element) {
      container = this.ElementsReference.carouselContainer as HTMLElement;
    } else {
      container = element;
    }

    container.style.transition = '';
  }
}

export default ImageCarousel;
