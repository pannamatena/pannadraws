import React, { Component, PropTypes } from 'react';
import ImageTiler from './ImageTiler';
import Lightbox from 'react-images';
import _ from 'lodash';

class ImageGallery extends Component {

  /**
   * Instantiates the Image Gallery
   */
  constructor () {
    super();

    this.state = {
      containerWidth: 0,
      lightboxIsOpen: false,
      currentImage: 0
    };

    this.resizeTimer = null;

    this.adjustContainerWidth = this.adjustContainerWidth.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.goToNextImage = this.goToNextImage.bind(this);
    this.goToPreviousImage = this.goToPreviousImage.bind(this);
    this.goToSelectedImage = this.goToSelectedImage.bind(this);
    this.createShowGalleryHandler = this.createShowGalleryHandler.bind(this);
    this.getGridProps = this.getGridProps.bind(this);
    this.getSmallWidthOfTile = this.getSmallWidthOfTile.bind(this);
    this.getImageElements = this.getImageElements.bind(this);
    this.getContainerHeight = this.getContainerHeight.bind(this);
  }

  /**
   * Adds event listener on component mount and calls the resize function.
   */
  componentDidMount () {
    this.adjustContainerWidthDebounced = _.debounce(this.adjustContainerWidth, 100);
    window.addEventListener('resize', this.adjustContainerWidthDebounced);
    window.addEventListener('load', this.adjustContainerWidth);
    this.adjustContainerWidth();
  }

  /**
   * Removes event listener on component unmount.
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this.adjustContainerWidthDebounced);
    window.removeEventListener('load', this.adjustContainerWidth);
  }

  /**
   * Adjusts image container width
   *
   * @private
   */
  adjustContainerWidth () {
    this.setState({
      containerWidth: this.refs.imageContainer.clientWidth
    });
  }

  /**
   * Closes the gallery.
   *
   * @private
   */
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  /**
   * Shows previous image in the gallery.
   *
   * @private
   */
  goToPreviousImage () {
    if (this.state.currentImage === 0) {
      return;
    }
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  /**
   * Shows next image in the gallery.
   *
   * @private
   */
  goToNextImage () {
    if (this.state.currentImage === this.props.images.length - 1) {
      return;
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  /**
   * Shows selected image in the gallery.
   *
   * @param index
   * @private
   */
  goToSelectedImage (index) {
    this.setState({
      currentImage: index,
    });
  }

  /**
   * Creates a handler that shows the gallery at the selected image.
   *
   * @param imageIndex - Index of the clicked image
   * @return {function}
   * @private
   */
  createShowGalleryHandler (imageIndex) {
    return () => {
      this.setState({
        currentImage: imageIndex,
        lightboxIsOpen: true,
      });
    }
  }

  /**
   * Gets the properties of the image grid.
   *
   * @return {{ columns: 2|3|4|5, margin: 10|15|20, layout: 'simple'|'right'|'left' }} Object containing the grid properties
   * @private
   */
  getGridProps () {
    const breakPoint = Object.keys(this.props.breakPoints)
        .map(breakPoint => parseInt(breakPoint, 10))
        .sort((a, b) => a - b)
        .reverse()
        .find(breakPoint => window.innerWidth >= breakPoint);

    return this.props.breakPoints[breakPoint];
  }

  /**
   * Gets the width of the smaller tile size of the gallery.
   *
   * @param containerWidth - Width of the gallery container element
   * @param gridProps - Object containing the grid properties
   * @return {number} The width of the smaller tile in the gallery
   * @private
   */
  getSmallWidthOfTile (containerWidth, gridProps) {
    return (containerWidth - (gridProps.margin * (gridProps.columns - 1))) / gridProps.columns;
  }

  /**
   * Gets the image elements to be displayed in the gallery.
   *
   * @param smallTileWidth - The width of the smaller tile in the gallery
   * @param tileMarginInGrid - Margin of images displayed in the gallery grid
   * @param gridTiles - Array of tiles that determines the layout of the gallery grid
   * @param images - Array of image objects to be displayed in the gallery
   * @return {Element[]} Image elements to be displayed in the gallery grid
   * @private
   */
  getImageElements (smallTileWidth, tileMarginInGrid, gridTiles, images) {
    const getWidth = (size) => (smallTileWidth * size) + (tileMarginInGrid * (size - 1));

    return gridTiles.map((tile, index) =>
        (
            <a
                className="imageGalleryItem"
                href="javascript:"
                style={{
                  position: 'absolute',
                  left: tile.x * getWidth(1) + (tile.x * tileMarginInGrid),
                  top: tile.y * getWidth(1) + (tile.y * tileMarginInGrid),
                  width: getWidth(tile.size),
                  height: getWidth(tile.size)
                }}
                key={index}
                onClick={this.createShowGalleryHandler(images.indexOf(tile.image))}
            >
              <img src={tile.image.imageThumb} style={{
                width: getWidth(tile.size),
                height: getWidth(tile.size)
              }} alt={tile.image.imageAlt}/>
            </a>
        )
    );
  }

  /**
   * Gets the gallery container height.
   *
   * @param smallTileWidth - The width of the smaller tile in the gallery
   * @param tileMarginInGrid - Margin of images displayed in the gallery grid
   * @param gridRows - Array of rows that determines the layout of the gallery grid
   * @return {number} The height of the gallery container
   * @private
   */
  getContainerHeight (smallTileWidth, tileMarginInGrid, gridRows) {
    return (smallTileWidth * gridRows) + (tileMarginInGrid * (gridRows - 1));
  }

  /**
   * Renders the component.
   */
  render () {
    const containerWidth = this.state.containerWidth;
    if (containerWidth === 0) {
      return <div ref="imageContainer"></div>;
    }

    const images = this.props.images;
    const gridProps = this.getGridProps();
    const smallTileWidth = this.getSmallWidthOfTile(containerWidth, gridProps);

    const imageTiler = new ImageTiler(gridProps.layout, gridProps.columns);
    imageTiler.placeImagesInGrid(images);

    return (
        <div
            ref="imageContainer"
            className={`imageGallery ${this.props.galleryType || 'imageGallery--leftOriented'}`}
            style={{
              position: 'relative',
              height: this.getContainerHeight(smallTileWidth, gridProps.margin, imageTiler.getGridRows())
            }}>
          {containerWidth !== 0 && this.getImageElements(smallTileWidth, gridProps.margin, imageTiler.getGridTiles(), images)}
          <Lightbox
              currentImage={this.state.currentImage}
              images={this.props.images.map(image => ({ src: image.image }))}
              isOpen={this.state.lightboxIsOpen}
              onClickImage={this.goToNextImage}
              onClickNext={this.goToNextImage}
              onClickPrev={this.goToPreviousImage}
              onClickThumbnail={this.goToSelectedImage}
              onClose={this.closeLightbox}
              showThumbnails={true}
          />
        </div>
    );
  }
}

/**
 * List of valid property types for Image Gallery component.
 */
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  galleryType: PropTypes.string,
  breakPoints: PropTypes.object.isRequired
};

export default ImageGallery;
