class ImageTiler {
  /**
   * Creates an ImageTiler instance.
   *
   * @param {string} layoutType - The layout type to be used ('left', 'right', 'simple')
   * @param {number} columns - The number of columns to use
   */
  constructor (layoutType, columns) {
    this.grid = {};
    this.layoutType = layoutType;
    this.columns = columns;
  }

  /**
   * Gets the string key of the area occupied by the image tile at the given coordinates in the grid.
   *
   * @param x - The horizontal coordinate
   * @param y - The vertical coordinate
   * @return {string} - The coordinate key of the occupied area
   * @private
   */
  getCoordinateKey (x, y) {
    return `${x}_${y}`;
  }

  /**
   * Registers the place as occupied for the given image.
   *
   * @param pos - Position of the image
   * @param image - The image data object
   * @param imageSize - Size of the image
   * @private
   */
  occupyPlaceForImage (pos, image, imageSize) {
    for (let x = 0; x < imageSize; x++) {
      for (let y = 0; y < imageSize; y++) {
        const coordinateKey = this.getCoordinateKey(pos.x + x, pos.y + y);
        this.grid[coordinateKey] = { x: pos.x + x, y: pos.y + y };

        if (x === 0 && y === 0) {
          this.grid[coordinateKey].image = image;
          this.grid[coordinateKey].size = imageSize;
        }
      }
    }
  }

  /**
   * Finds and occupies the nearest vacant position for the image.
   *
   * @param image - The image data object
   * @param imageSize - Size of the image
   * @param isFromRight - Direction of search
   * @private
   */
  placeImageAtFreePosition (image, imageSize, isFromRight) {
    let x = isFromRight ? this.columns - 1 : 0;
    let y = 0;
    while (true) {
      const coordinateKey = this.getCoordinateKey(x, y);
      if (!this.grid[coordinateKey]) {
        this.occupyPlaceForImage({ x, y }, image, imageSize);
        return;
      }
      x = isFromRight ? x - 1 : x + 1;
      if ((!isFromRight && x === this.columns) || (isFromRight && x === -1)) {
        x = isFromRight ? this.columns - 1 : 0;
        y++;
      }
    }
  }

  /**
   * Places the given images in the grid.
   *
   * @param images - Array of image data objects to be placed in the grid
   */
  placeImagesInGrid (images) {
    switch (this.layoutType) {
      case 'left':
        this.placeImagesInLeftOrientation(images);
        break;
      case 'right':
        this.placeImagesInRightOrientation(images);
        break;
      default:
        this.placeImagesInSimpleOrientation(images);
        break;
    }
  }

  /**
   * Places images in left orientation (the large image goes to the left side of the grid)
   *
   * @param images - Array of image data objects to be placed in the grid
   * @private
   */
  placeImagesInLeftOrientation (images) {
    images.forEach((image, idx) => {
      if (idx === 0) {
        this.occupyPlaceForImage({ x: 0, y: 0 }, images[idx], 2);
      } else {
        this.placeImageAtFreePosition(images[idx], 1);
      }
    });
  }

  /**
   * Places images in right orientation (the large image goes to the right side of the grid)
   *
   * @param images - Array of image data objects to be placed in the grid
   * @private
   */
  placeImagesInRightOrientation (images) {
    images.forEach((image, idx) => {
      if (idx === 0) {
        this.occupyPlaceForImage({ x: this.columns - 2, y: 0 }, images[idx], 2);
      } else {
        this.placeImageAtFreePosition(images[idx], 1, true);
      }
    });
  }

  /**
   * Places images in simple orientation (no large image in the grid, images come from left to right)
   *
   * @param images - Array of image data objects to be placed in the grid
   * @private
   */
  placeImagesInSimpleOrientation (images) {
    images.forEach((image, idx) => {
      this.placeImageAtFreePosition(images[idx], 1);
    });
  }

  /**
   * Returns the number of rows in the grid.
   *
   * @returns {number} The number of rows in the grid
   */
  getGridRows () {
    return Math.max(...Object.values(this.grid).map(slot => slot.y)) + 1;
  }

  /**
   * Returns all the tiles that is occupied by an image in the grid.
   *
   * @returns {{x: number, y: number, image: Object, size: number}[]} Array of objects containing the image tile data
   */
  getGridTiles () {
    return Object.values(this.grid).filter(slot => slot.image);
  }
}

export default ImageTiler;
