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
   * @return {string} The coordinate key of the occupied area
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
   * @param imageSize - Magnitude of image, 1 for smallest size, 2 for smallest * 2, etc
   * @private
   */
  occupyPlaceForImage (pos, image, imageSize) {
    for (let x = 0; x < imageSize; x++) {
      for (let y = 0; y < imageSize; y++) {
        const coordinateKey = this.getCoordinateKey(pos.x + x, pos.y + y);
        this.setGridPositionAsOccupied(pos, x, y, coordinateKey);

        if (x === 0 && y === 0) {
          this.applyImageDataOnGridPosition(coordinateKey, image, imageSize);
        }
      }
    }
  }

  /**
   * Sets the coordinates to be occupied in the grid.
   *
   * @param pos - Position of the image
   * @param x - The coordinate on the horizontal axis
   * @param y - The coordinate on the vertical axis.
   * @param coordinateKey - The string key of the x and y positions
   * @private
   */
  setGridPositionAsOccupied (pos, x, y, coordinateKey) {
    this.grid[coordinateKey] = { x: pos.x + x, y: pos.y + y };
  }

  /**
   * Sets the image and imageSize parameters to the grid.
   *
   * @param coordinateKey - The string key of the x and y position
   * @param image - The image to be added to the grid
   * @param imageSize - Magnitude of image, 1 for smallest size, 2 for smallest * 2, etc
   * @private
   */
  applyImageDataOnGridPosition (coordinateKey, image, imageSize) {
    this.grid[coordinateKey].image = image;
    this.grid[coordinateKey].size = imageSize;
  }

  /**
   * Finds and occupies the nearest vacant position for the image.
   *
   * @param image - The image data object
   * @param imageSize - Magnitude of image, 1 for smallest size, 2 for smallest * 2, etc
   * @param isFromRight - Direction of search
   * @private
   */
  placeImageAtFreePosition (image, imageSize, isFromRight) {
    const {x, y} = this.getFirstFreePosition(imageSize, isFromRight);
    this.occupyPlaceForImage({ x, y }, image, imageSize);
  }

  /**
   * Finds the first available free position for the image.
   *
   * @param isFromRight - Do we fill the grid from the right? (If gallery is right oriented)
   * @return {{x: *, y: number}} The x and y coordinates where the image is to be placed
   * @private
   */
  getFirstFreePosition (isFromRight) {
    let x = this.getInitialXPosValueByOrientation(isFromRight);
    let y = 0;
    while (true) {
      const coordinateKey = this.getCoordinateKey(x, y);

      if (!this.grid[coordinateKey]) {
        return { x, y };
      }

      ({x, y} = this.stepToNextCoordinates(isFromRight, x, y));
    }
  }

  /**
   * Steps to next coordinate in grid.
   *
   * @param isFromRight - Do we fill the grid from the right? (If gallery is right oriented)
   * @param x - The coordinate on the horizontal axis
   * @param y - The coordinate on the vertical axis
   * @return {{x: (number|*), y: *}} Value of the x and y positions
   * @private
   */
  stepToNextCoordinates (isFromRight, x, y) {
    x = this.getNextFreeXPosValueByOrientation(isFromRight, x);
    if (this.isPositionTheEndOfRow(isFromRight, x)) {
      x = this.getInitialXPosValueByOrientation(isFromRight);
      y++;
    }
    return {x, y};
  }

  /**
   * Checks if the position is at the end of one row.
   *
   * @param isFromRight - Do we fill the grid from the right? (If gallery is right oriented)
   * @param x - The coordinate on the horizontal axis
   * @return {boolean|*} True if we are at first (last) column in grid if filled from right (left)
   * @private
   */
  isPositionTheEndOfRow (isFromRight, x) {
    return (!isFromRight && x === this.columns) || (isFromRight && x === -1)
  }

  /**
   * Gets the initial x coordinate value.
   *
   * @param isFromRight - Do we fill the grid from the right? (If gallery is right oriented)
   * @return {number} The initial value of the x coordinate
   * @private
   */
  getInitialXPosValueByOrientation (isFromRight) {
    return isFromRight ? this.columns - 1 : 0;
  }

  /**
   * Gets the next possible (vacant) x coordinate where the image can be placed.
   *
   * @param isFromRight - Do we fill the grid from the right? (If gallery is right oriented)
   * @param x - The position on the horizontal axis
   * @return {number} Value of the next free x coordinate
   * @private
   */
  getNextFreeXPosValueByOrientation (isFromRight, x) {
    return isFromRight ? x - 1 : x + 1;
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
   * Places images in right orientation (the large image is the first in the array, it goes to the right side of the grid)
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
    // Object.Values crashes in Safari
    return Math.max(...Object.keys(this.grid).map(key => this.grid[key]).map(slot => slot.y)) + 1;
  }

  /**
   * Returns all the tiles that is occupied by an image in the grid.
   *
   * @returns {{x: number, y: number, image: Object, size: number}[]} Array of objects containing the image tile data
   */
  getGridTiles () {
    // Object.Values crashes in Safari
    return Object.keys(this.grid).map(key => this.grid[key]).filter(slot => slot.image);
  }

}

export default ImageTiler;
