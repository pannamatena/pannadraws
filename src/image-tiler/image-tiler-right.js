import ImageTiler from './image-tiler';

class ImageTilerRight extends ImageTiler {

  /**
   * Places images in right orientation (the large image is the first in the array, it goes to the right side of the grid)
   *
   * @param images - Array of image data objects to be placed in the grid
   * @private
   */
  placeImagesInGrid (images) {
    this.grid = {};
    images.forEach((image, idx) => {
      if (idx === 0) {
        this.occupyPlaceForImage({ x: this.columns - 2, y: 0 }, images[idx], 2);
      } else {
        this.placeImageAtFreePosition(images[idx], 1, true);
      }
    });
  }
}

export default ImageTilerRight;