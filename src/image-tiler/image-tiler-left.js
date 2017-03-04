import ImageTiler from './image-tiler';

class ImageTilerLeft extends ImageTiler {

  /**
   * Places images in left orientation (the large image goes to the left side of the grid)
   *
   * @param images - Array of image data objects to be placed in the grid
   * @private
   */
  placeImagesInGrid (images) {
    this.grid = {};
    images.forEach((image, idx) => {
      if (idx === 0) {
        this.occupyPlaceForImage({ x: 0, y: 0 }, images[idx], 2);
      } else {
        this.placeImageAtFreePosition(images[idx], 1);
      }
    });
  }
}

export default ImageTilerLeft;