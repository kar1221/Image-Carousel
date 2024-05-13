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
declare class ImageCarousel {
  private root;
  private itemsCount;
  private ElementsReference;
  private currentIndex;
  private rootWidth;
  private userOptions;
  private intervalId;
  private timeoutID;
  constructor(root: HTMLElement, options?: Partial<Options>);
  private initArrows;
  StartAutoplay(): void;
  StopAutoplay(): void;
  private SetTransformOffset;
  NextPage(): void;
  PreviousPage(): void;
  private HandleResize;
  private ApplyTransition;
  private RemoveTransition;
}
export default ImageCarousel;
