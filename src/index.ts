import ImageCarousel from "./ImageCarousel/ImageCarousel";
import "./css-reset.css";

const imageCarousel = new ImageCarousel(document.getElementById("image-carousel")!, {
  loop: false,
});
imageCarousel.StopAutoplay();

imageCarousel.StartAutoplay();