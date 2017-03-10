# pannadraws

## What is this?
This is my personal website, featuring two React galleries customised for my needs. The code is built on the basic React starter project and the style is compiled from SCSS.

[Visit my site for a demo](http://pannadraws.com/ "Pannadraws.com")

## Descriptive Gallery
Descriptive Gallery is a component displaying one featured image on the left and customizable title, URL and description on the right. By clicking on the thumbnail a Lightbox gallery shows all the images added to the gallery instance.
The gallery has a responsive layout from CSS.

![Descriptive Gallery](http://pannadraws.com/gallery_descriptive_showroom.png)

### How to use
You have to define the thumbnail of the image that would be the featured image in the gallery.
The `images` property expects an array of image paths, which will form the content of the gallery.
`year`, `url`, `description` and `imageAlt` are optional.
```
<DescriptiveGallery
  imageThumb="/development/springComic/springcomic_site_design_thumb.png"
  images={[
      '/development/springComic/springcomic_site_design.png',
      '/development/springComic/springcomic_site_illustrations.png'
    ]}
  title="Spring"
  year="2016 - (ongoing)"
  url={{ urlTarget: 'http://springcomic.com', urlDisplay: 'springcomic.com' }}
  skills={['UX/UI design', 'React Js', 'Sass']}
  description="A visual fantasy novel written and illustrated by me."
  imageAlt="Spring - A visual fantasy novel"></DescriptiveGallery>
```

## Image Gallery Grid
This is a gallery where images are displayed in various layouts, either left or right oriented, or in a simple row. Left oriented galleries feature an enlarged image as first on the left, while the right oriented ones display it on the right side. Other images included in the gallery are placed next to the big images as tiles.
The gallery has a responsive layout, which is calculated from the ImageTiler class.

![Image Gallery Grid](http://pannadraws.com/gallery_grid_showroom.png)

### How to use
To create an instance of this gallery, you have to define the desired layouts for each breakpoint.
In the `images` property the gallery expects an array of objects with image properties.
I have my breakpoints at 480px, 600px, 800px and 1024px, which stand for the screen widths.
Depending on the number of images you want to include you may define for each breakpoint how many columns and how big margin you want between the image tiles.
The layout property currently supports `simple`, `right` and `left`. The `simple` layout is just a row of equally sized images, while `right` and `left` display a highlighted, large image on the appropriate side.
```
<ImageGalleryGrid
    images={[
      {
        imageThumb: '/development/crossyards/gallery_crossyards_1_thumb.png',
        image: '/development/crossyards/gallery_crossyards_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/crossyards/gallery_crossyards_2_thumb.png',
        image: '/development/crossyards/gallery_crossyards_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/crossyards/gallery_crossyards_3_thumb.png',
        image: '/development/crossyards/gallery_crossyards_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/crossyards/gallery_crossyards_4_thumb.png',
        image: '/development/crossyards/gallery_crossyards_4.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/crossyards/gallery_crossyards_5_thumb.png',
        image: '/development/crossyards/gallery_crossyards_5.png',
        imageAlt: ''
      }
    ]}
    breakPoints={{
      0: { columns: 2, margin: 10, layout: 'simple' },
      480: { columns: 3, margin: 10, layout: 'right' },
      600: { columns: 4, margin: 15, layout: 'right' },
      800: { columns: 4, margin: 15, layout: 'right' },
      1024: { columns: 5, margin: 20, layout: 'right' }
    }}
/>
```

## Why make these when you have plenty of other galleries in React?
None of what I've seen had this exact layout that I had in mind and behaved well in different resolutions. And what's more, most galleries were too heavyweight for this project.

## Installation
Clone the repo and run
`npm install`

## Tests
Run unit tests with
`npm run test`

## Licence
You are free to use the gallery components and other code parts of the project as long as you give credit.
However, using the site graphic design and all artwork in any form other than personal use is not allowed and in all cases the watermark of pannadraws.com must not be removed.
