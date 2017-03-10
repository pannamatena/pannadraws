import { expect } from 'chai';
import ImageTiler from '../src/image-tiler/image-tiler';

describe('ImageTiler', () => {
  describe('placeImagesInGrid', () => {
    describe('When placeImagesInGrid gets undefined as a parameter', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should throw an error', () => {
        expect(() => {
          imageTiler.placeImagesInGrid();
        }).to.throw('Invalid input data. Expects an array.');
      });
    });
    describe('When placeImagesInGrid gets a parameter other than an array', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should throw an error', () => {
        expect(() => {
          imageTiler.placeImagesInGrid({notAn: 'array'});
        }).to.throw('Invalid input data. Expects an array.');
      });
    });
    describe('When placeImagesInGrid gets an empty array as a parameter', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should initialize an empty grid', () => {
        imageTiler.placeImagesInGrid([]);
        const result = imageTiler.getGridRows();
        expect(result).to.equal(0);
      });
    });
    describe('When placeImagesInGrid gets an array as a parameter that contains items other than objects', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should throw an error', () => {
        expect(() => {
          imageTiler.placeImagesInGrid([['notAnObject']]);
        }).to.throw('Invalid input data. Expects an array of objects.');
      });
    });
    describe('When placeImagesInGrid gets an array of objects where keys are invalid', () => {
      let imageTiler;
      let testImages;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
        testImages = [
          {
            falseKey1: 'testImageThumb',
            falseKey2: 'testImage'
          }
        ];
      });

      it('should throw an error', () => {
        expect(() => {
          imageTiler.placeImagesInGrid(testImages);
        }).to.throw('Invalid input data. Expects an array of objects with keys imageThumb, image, imageAlt.');
      });
    });
    describe('When placeImagesInGrid gets an array of objects with keys imageThumb, image, imageAlt but values are not strings', () => {
      let imageTiler;
      let testImages;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
        testImages = [
          {
            imageThumb: {notA: 'string'},
            image: {notA: 'string'},
            imageAlt: {notA: 'string'}
          }
        ];
      });

      it('should throw an error', () => {
        expect(() => {
          imageTiler.placeImagesInGrid(testImages);
        }).to.throw('Invalid input data. Expects an array of objects with string values.');
      });
    });
    describe('When placeImagesInGrid gets an array of objects with keys imageThumb, image, imageAlt and all values are strings', () => {
      let imageTiler;
      let testImages;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
        testImages = [
          {
            imageThumb: '/testImageThumb1',
            image: '/testImage1',
            imageAlt: 'testImageAlt1'
          },
          {
            imageThumb: '/testImageThumb2',
            image: '/testImage2',
            imageAlt: 'testImageAlt2'
          },
          {
            imageThumb: '/testImageThumb3',
            image: '/testImage3',
            imageAlt: 'testImageAlt3'
          }
        ];
      });

      it('should initialize the grid with the given images', () => {
        imageTiler.placeImagesInGrid(testImages);
        const result = imageTiler.getGridRows();
        expect(result).to.equal(3);
      });
    });
  });
  describe('getGridRows', () => {
    describe('When no images are inserted in the grid', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should return 0', () => {
        const result = imageTiler.getGridRows();
        expect(result).to.equal(0);
      });
    });
    describe('When 1 image is inserted and grid has 1 column', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
        imageTiler.placeImagesInGrid([
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          }
        ]);
      });

      it('should return 1', () => {
        const result = imageTiler.getGridRows();
        expect(result).to.equal(1);
      });
    });
    describe('When 6 images are inserted and grid has 2 columns', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(2);
        imageTiler.placeImagesInGrid([
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          },
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          },
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          },
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          },
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          },
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          }
        ]);
      });

      it('should return 3', () => {
        const result = imageTiler.getGridRows();
        expect(result).to.equal(3);
      });
    });
  });
  describe('getGridTiles', () => {
    describe('When no images are inserted in the grid', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
      });

      it('should return an empty array', () => {
        const result = imageTiler.getGridTiles();
        expect(result).to.be.an('array');
        expect(result).to.have.length(0);
      });
    });
    describe('When 1 image is inserted and grid has 1 column', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(1);
        imageTiler.placeImagesInGrid([
          {
            imageThumb: '/testThumbnail',
            image: '/testImage',
            imageAlt: 'testAlt'
          }
        ]);
      });

      it('should return the array of image data of a single image', () => {
        const result = imageTiler.getGridTiles();
        expect(result).to.be.an('array');
        expect(result).to.have.length(1);
        expect(result).to.deep.equal([{
          image: {
            image: '/testImage',
            imageAlt: 'testAlt',
            imageThumb: '/testThumbnail'
          },
          size: 1,
          x: 0,
          y: 0
        }]);
      });
    });
    describe('When 6 images are inserted and grid has 2 columns', () => {
      let imageTiler;

      beforeEach(() => {
        imageTiler = new ImageTiler(2);
        imageTiler.placeImagesInGrid([
          {
            imageThumb: '/testThumbnail1',
            image: '/testImage1',
            imageAlt: 'testAlt1'
          },
          {
            imageThumb: '/testThumbnail2',
            image: '/testImage2',
            imageAlt: 'testAlt2'
          },
          {
            imageThumb: '/testThumbnail3',
            image: '/testImage3',
            imageAlt: 'testAlt3'
          },
          {
            imageThumb: '/testThumbnail4',
            image: '/testImage4',
            imageAlt: 'testAlt4'
          },
          {
            imageThumb: '/testThumbnail5',
            image: '/testImage5',
            imageAlt: 'testAlt5'
          },
          {
            imageThumb: '/testThumbnail6',
            image: '/testImage6',
            imageAlt: 'testAlt6'
          }
        ]);
      });

      it('should return the array of image data of all images', () => {
        const result = imageTiler.getGridTiles();
        expect(result).to.be.an('array');
        expect(result).to.have.length(6);
        expect(result).to.deep.equal([
          {
            image: {
              image: "/testImage1",
              imageAlt: "testAlt1",
              imageThumb: "/testThumbnail1"
            },
            size: 1,
            x: 0,
            y: 0
          },
          {
            image: {
              image: "/testImage2",
              imageAlt: "testAlt2",
              imageThumb: "/testThumbnail2"
            },
            size: 1,
            x: 1,
            y: 0
          },
          {
            image: {
              image: "/testImage3",
              imageAlt: "testAlt3",
              imageThumb: "/testThumbnail3"
            },
            size: 1,
            x: 0,
            y: 1
          },
          {
            image: {
              image: "/testImage4",
              imageAlt: "testAlt4",
              imageThumb: "/testThumbnail4"
            },
            size: 1,
            x: 1,
            y: 1
          },
          {
            image: {
              image: "/testImage5",
              imageAlt: "testAlt5",
              imageThumb: "/testThumbnail5"
            },
            size: 1,
            x: 0,
            y: 2
          },
          {
            image: {
              image: "/testImage6",
              imageAlt: "testAlt6",
              imageThumb: "/testThumbnail6"
            },
            size: 1,
            x: 1,
            y: 2
          }
        ]);
      });
    });
  });
});