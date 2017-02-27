import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';

class DescriptiveGallery extends Component {

  /**
   * Instantiate a Descriptive Gallery.
   */
  constructor () {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    };

    // because we refer to a property of a react component (state) in checkIfScreenIsScrolled
    // we need to bind the function to 'this'.
    this.closeLightbox = this.closeLightbox.bind(this);
    this.goToNextImage = this.goToNextImage.bind(this);
    this.goToPreviousImage = this.goToPreviousImage.bind(this);
    this.goToSelectedImage = this.goToSelectedImage.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.getProjectUrlElement = this.getProjectUrlElement.bind(this);
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
   * Displays the gallery.
   *
   * @private
   */
  showGallery () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: true,
    });
  }

  /**
   * Displays the project URL.
   *
   * @private
   */
  getProjectUrlElement () {
    const url = this.props.url;
    if (!url) {
      return null;
    }

    if (!url.urlTarget) {
      return <p>{url.urlDisplay}</p>;
    }

    return <p><a href={url.urlTarget} target="_blank">{url.urlDisplay}</a></p>;
  }

  /**
   * Renders the component.
   */
  render () {
    const skills = this.props.skills.map((skill, index) =>(
        <div key={index}><span>{skill}</span><span className="separator">&nbsp;</span></div>
    ));

    return (
        <div className="descriptiveGallery">
          <a href="javascript:" className="descriptiveGalleryItem" onClick={this.showGallery}><img
              src={this.props.imageThumb} alt={this.props.imageAlt}/></a>
          <h3>{this.props.title}</h3>
          {this.props.year && <h4>{this.props.year}</h4>}
          {this.getProjectUrlElement()}
          <div className="skills">{skills}</div>
          {this.props.description && <p>{this.props.description}</p>}
          <Lightbox
              currentImage={this.state.currentImage}
              images={this.props.images.map(image => ({ src: image }))}
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
 * List of valid property types for Descriptive Gallery component.
 */
DescriptiveGallery.propTypes = {
  imageThumb: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
  url: PropTypes.object,
  skills: PropTypes.array.isRequired,
  description: PropTypes.string,
  imageAlt: PropTypes.string
};

export default DescriptiveGallery;
