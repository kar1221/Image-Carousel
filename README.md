# Image Carousel
An assignment from The Odin Project.

### Usage:
```typescript
import ImageCarousel from './ImageCarousel';

// Create a root element for the carousel (e.g., a <div> with id="carousel").
const rootElement = document.getElementById('carousel');

// Define custom options (optional).
const customOptions = {
  autoplay: true,
  transitionDuration: 0.5,
  autoplayInterval: 4,
  loop: false,
};

// Initialize the ImageCarousel with the root element and custom options.
const carousel = new ImageCarousel(rootElement, customOptions);

// To start autoplay
carousel.StartAutoplay();

// To stop autoplay (if started):
carousel.StopAutoplay();
```


### Options:
1. **autoplay** (boolean, default: true)
	- Enables automatic switching between images in the carousel.
	- Set to `true` to enable autoplay, or `false` to disable it.
2. **transitionDuration** (number, default: 0.3)
	- Specifies the duration of the transition when changing images.
	- Measured in seconds.
3. **autoplayInterval** (number, default: 3)
	- Sets the interval between image switches during autoplay.
	- Measured in seconds.
4. **loop** (boolean, default: true)
	- Determines whether the carousel should loop back to the first image after reaching the last image.
	-   Set to `true` to enable looping, or `false` to disable it.

### Customizing Style:
To customize the style of the image carousel, you can use the following class names in your CSS or SCSS files:

-   `.image-carousel__container`: Styles the container of the carousel images.
-   `.image-carousel__prev-btn`: Styles the previous button (left arrow) for navigation.
-   `.image-carousel__next-btn`: Styles the next button (right arrow) for navigation.

For example, to change the background color of the carousel container:
```scss
.image-carousel__container {
  background-color: #f0f0f0;
  /* Add more styles as needed */
}
```

To change the color and size of the navigation buttons:
```scss
.image-carousel__prev-btn,
.image-carousel__next-btn {
  color: #333;
  font-size: 24px;
  /* Add more styles as needed */
}
```