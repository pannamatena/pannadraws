import React, { Component } from 'react';
import BrowserVersion from './BrowserVersion';
import Header from './Header';
import aboutImg from './img/about.png';
import { Element } from 'react-scroll';
import ImageGallery from './ImageGallery';
import DescriptiveGallery from './DescriptiveGallery';

class App extends Component {

  /**
   * Instantiates the main component.
   */
  constructor () {
    super();

    const browserVersion = new BrowserVersion();
    const ieVersion = browserVersion.getIEVersion();
    if (ieVersion && ieVersion < 12) {
      alert('Ooops, it looks like you\'re using Internet Explorer. As much as I like retro stuff, I don\'t support this browser, please use something else. (Browsers my site is tested in: Google Chrome, Mozilla Firefox and Safari on OSX)');
    }
  }

  /**
   * Renders the component.
   */
  render () {
    const imagesStuntmansRampage = [
      {
        imageThumb: '/development/stuntmansRampage/gallery_stuntman_1_thumb.png',
        image: '/development/stuntmansRampage/gallery_stuntman_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/stuntmansRampage/gallery_stuntman_2_thumb.png',
        image: '/development/stuntmansRampage/gallery_stuntman_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/stuntmansRampage/gallery_stuntman_3_thumb.png',
        image: '/development/stuntmansRampage/gallery_stuntman_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/stuntmansRampage/gallery_stuntman_4_thumb.png',
        image: '/development/stuntmansRampage/gallery_stuntman_4.png',
        imageAlt: ''
      }
    ];
    const imagesCrossyards = [
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
    ];
    const imagesLogos = [
      {
        imageThumb: '/development/logos/lolly_rewards_thumb.png',
        image: '/development/logos/lolly_rewards.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/logos/neurecho_logo_thumb.png',
        image: '/development/logos/neurecho_logo.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/logos/puppyk_logo_thumb.png',
        image: '/development/logos/puppyk_logo.png',
        imageAlt: ''
      }
    ];
    const imagesLovetreeAlarm = [
      {
        imageThumb: '/development/lovetreeAlarm/lovetreesite_1_thumb.png',
        image: '/development/lovetreeAlarm/lovetreesite_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreeapp_1_thumb.png',
        image: '/development/lovetreeAlarm/lovetreeapp_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreeapp_2_thumb.png',
        image: '/development/lovetreeAlarm/lovetreeapp_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreeapp_3_thumb.png',
        image: '/development/lovetreeAlarm/lovetreeapp_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreeapp_4_thumb.png',
        image: '/development/lovetreeAlarm/lovetreeapp_4.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreesite_2_thumb.png',
        image: '/development/lovetreeAlarm/lovetreesite_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/lovetreeAlarm/lovetreesite_3_thumb.png',
        image: '/development/lovetreeAlarm/lovetreesite_3.png',
        imageAlt: ''
      }
    ];
    const imagesSpringstorm = [
      {
        imageThumb: '/development/springstorm/gallery_springstorm_1_thumb.png',
        image: '/development/springstorm/gallery_springstorm_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/springstorm/gallery_springstorm_2_thumb.png',
        image: '/development/springstorm/gallery_springstorm_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/springstorm/gallery_springstorm_3_thumb.png',
        image: '/development/springstorm/gallery_springstorm_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/springstorm/gallery_springstorm_4_thumb.png',
        image: '/development/springstorm/gallery_springstorm_4.png',
        imageAlt: ''
      }
    ];
    const imagesTappointment = [
      {
        imageThumb: '/development/tappointment/gallery_tapp_1_thumb.png',
        image: '/development/tappointment/gallery_tapp_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/tappointment/gallery_tapp_2_thumb.png',
        image: '/development/tappointment/gallery_tapp_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/tappointment/gallery_tapp_3_thumb.png',
        image: '/development/tappointment/gallery_tapp_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/tappointment/gallery_tapp_4_thumb.png',
        image: '/development/tappointment/gallery_tapp_4.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/tappointment/gallery_tapp_5_thumb.png',
        image: '/development/tappointment/gallery_tapp_5.png',
        imageAlt: ''
      }
    ];
    const imagesWordLearning = [
      {
        imageThumb: '/development/wordLearning/gallery_wordlearn_1_thumb.png',
        image: '/development/wordLearning/gallery_wordlearn_1.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/wordLearning/gallery_wordlearn_2_thumb.png',
        image: '/development/wordLearning/gallery_wordlearn_2.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/wordLearning/gallery_wordlearn_3_thumb.png',
        image: '/development/wordLearning/gallery_wordlearn_3.png',
        imageAlt: ''
      },
      {
        imageThumb: '/development/wordLearning/gallery_wordlearn_4_thumb.png',
        image: '/development/wordLearning/gallery_wordlearn_4.png',
        imageAlt: ''
      }
    ];
    const imagesIllustrations = [
      {
        imageThumb: '/illustrations/springcomic_characters_03_thumb.png',
        image: '/illustrations/springcomic_characters_03.png',
        imageAlt: ''
      },
      { imageThumb: '/illustrations/sketch_1_thumb.png', image: '/illustrations/sketch_1.png', imageAlt: '' },
      { imageThumb: '/illustrations/sketch_2_thumb.png', image: '/illustrations/sketch_2.png', imageAlt: '' },
      {
        imageThumb: '/illustrations/theres_no_up_or_down_thumb.png',
        image: '/illustrations/theres_no_up_or_down.png',
        imageAlt: ''
      },
      { imageThumb: '/illustrations/nightmare_thumb.png', image: '/illustrations/nightmare.png', imageAlt: '' },
      { imageThumb: '/illustrations/flight_lesson_thumb.png', image: '/illustrations/flight_lesson.png', imageAlt: '' },
      {
        imageThumb: '/illustrations/heir_to_a_realm_thumb.png',
        image: '/illustrations/heir_to_a_realm.png',
        imageAlt: ''
      }
    ];

    const projectSpringComicImages = [
      '/development/springComic/springcomic_site_design.png',
      '/development/springComic/springcomic_site_illustrations.png'
    ];
    const projectPoweredNowImages = [
      '/development/poweredNow/gallery_pn_load.png',
      '/development/poweredNow/gallery_pn_location.png',
      '/development/poweredNow/gallery_pn_location_m.png',
      '/development/poweredNow/gallery_pn_chat.png',
      '/development/poweredNow/gallery_pn_chat_m.png'
    ];

    return (
        <div className="wrapper">

          <div className="pageTop">
            <Header></Header>
          </div>

          <div className="pageMiddle">
            <Element name="_upTo" className="content content-upTo">
              <div className="contentIn contentWidth">
                <h2>What I'm up to</h2>
                <h3><span>Current projects</span></h3>
                <DescriptiveGallery
                    imageThumb="/development/poweredNow/gallery_pn_load_thumb.png"
                    images={projectPoweredNowImages}
                    title="Powered Now"
                    year="2015 - (ongoing)"
                    url={{ urlTarget: 'http://web.powerednow.com', urlDisplay: 'web.powerednow.com' }}
                    skills={['Wireframes', 'UI Design', 'Sass', 'Ext.js']}
                    description="A scheduling and invoicing software for field workers."
                    imageAlt="Powered Now"></DescriptiveGallery>
                <DescriptiveGallery
                    imageThumb="/development/springComic/springcomic_site_design_thumb.png"
                    images={projectSpringComicImages}
                    title="Spring"
                    year="2016 - (ongoing)"
                    url={{ urlTarget: 'http://springcomic.com', urlDisplay: 'springcomic.com' }}
                    skills={['UX/UI design', 'React Js', 'Sass']}
                    description="A visual fantasy novel written and illustrated by me."
                    imageAlt="Spring - A visual fantasy novel"></DescriptiveGallery>
              </div>
            </Element>
            <Element name="_graphicDesign" className="content content-dev">
              <div className="contentIn contentWidth">
                <h2>Front-end Dev & Graphic Design</h2>
                <h3><span>UI/UX</span><span className="separator">&nbsp;</span><span>Adobe stuff</span><span
                    className="separator">&nbsp;</span><span>HTML</span><span className="separator">&nbsp;</span><span>CSS/SCSS</span><span
                    className="separator">&nbsp;</span><span>Javascript</span></h3>
                <div className="projectHolder first">
                  <h3>Stuntman's Rampage Website</h3>
                  <h4>2015</h4>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span><span className="separator">&nbsp;</span></div>
                    <div><span>HTML,SCSS</span></div>
                  </div>
                  <p>Stuntman's Rampage is a game using yards built in Crossyards.</p>
                  <ImageGallery
                      images={imagesStuntmansRampage}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'left' },
                        600: { columns: 4, margin: 15, layout: 'left' },
                        800: { columns: 4, margin: 15, layout: 'left' },
                        1024: { columns: 5, margin: 20, layout: 'left' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>Crossyards</h3>
                  <h4>2015</h4>
                  <p><a href="http://crossyards.com" target="_blank">crossyards.com</a></p>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span><span className="separator">&nbsp;</span></div>
                    <div><span>HTML,CSS</span></div>
                  </div>
                  <p>A social website where you can share your thoughts by drawing them onto a rectangular area (yard)
                    using a simple paint tool in your browser.</p>
                  <ImageGallery
                      images={imagesCrossyards}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'right' },
                        600: { columns: 4, margin: 15, layout: 'right' },
                        800: { columns: 4, margin: 15, layout: 'right' },
                        1024: { columns: 5, margin: 20, layout: 'right' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>Logos</h3>
                  <h4>2015-2016</h4>
                  <p>Various logos designed for people.</p>
                  <ImageGallery
                      images={imagesLogos}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'simple' },
                        600: { columns: 4, margin: 15, layout: 'simple' },
                        800: { columns: 4, margin: 15, layout: 'simple' },
                        1024: { columns: 5, margin: 20, layout: 'simple' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>Lovetree Alarm</h3>
                  <h4>2015</h4>
                  <p><a href="http://lovetreealarm.com/" target="_blank">lovetreealarm.com</a></p>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span><span className="separator">&nbsp;</span></div>
                    <div><span>HTML,CSS</span></div>
                  </div>
                  <p>A social alarm app for Android.</p>
                  <ImageGallery
                      images={imagesLovetreeAlarm}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'right' },
                        600: { columns: 4, margin: 15, layout: 'right' },
                        800: { columns: 4, margin: 15, layout: 'right' },
                        1024: { columns: 5, margin: 20, layout: 'right' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>Springstorm Website</h3>
                  <h4>2015</h4>
                  <p><a href="http://springstorm.uk" target="_blank">springstorm.uk</a></p>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span><span className="separator">&nbsp;</span></div>
                    <div><span>HTML,CSS</span></div>
                  </div>
                  <p>A simple company landing page.</p>
                  <ImageGallery
                      images={imagesSpringstorm}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'simple' },
                        600: { columns: 4, margin: 15, layout: 'simple' },
                        800: { columns: 4, margin: 15, layout: 'simple' },
                        1024: { columns: 5, margin: 20, layout: 'simple' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>Tappointment</h3>
                  <h4>2014</h4>
                  <p><a href="https://www.tappointment.com/" target="_blank">tappointment.com</a></p>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span><span className="separator">&nbsp;</span></div>
                    <div><span>HTML,CSS</span><span className="separator">&nbsp;</span></div>
                    <div><span>jQuery</span></div>
                  </div>
                  <p>Appointment management software for mobile and web.</p>
                  <ImageGallery
                      images={imagesTappointment}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'left' },
                        600: { columns: 4, margin: 15, layout: 'left' },
                        800: { columns: 4, margin: 15, layout: 'left' },
                        1024: { columns: 5, margin: 20, layout: 'left' }
                      }}
                  />
                </div>
                <div className="projectHolder">
                  <h3>WordLearning</h3>
                  <h4>2013</h4>
                  <div className="skills">
                    <div><span>Wireframes</span><span className="separator">&nbsp;</span></div>
                    <div><span>UI design</span></div>
                  </div>
                  <p>A vocabulary app for Android.</p>
                  <ImageGallery
                      images={imagesWordLearning}
                      breakPoints={{
                        0: { columns: 2, margin: 10, layout: 'simple' },
                        480: { columns: 3, margin: 10, layout: 'simple' },
                        600: { columns: 4, margin: 15, layout: 'simple' },
                        800: { columns: 4, margin: 15, layout: 'simple' },
                        1024: { columns: 5, margin: 20, layout: 'simple' }
                      }}
                  />
                </div>
              </div>
            </Element>
            <Element name="_illustration" className="content content-illustration grey">
              <div className="contentIn contentWidth">
                <h2>Illustration</h2>
                <h3><span>Freehand</span><span className="separator">&nbsp;</span><span>Vector art</span><span
                    className="separator">&nbsp;</span><span>Digital 2D</span></h3>
                <ImageGallery
                    images={imagesIllustrations}
                    breakPoints={{
                      0: { columns: 2, margin: 10, layout: 'simple' },
                      480: { columns: 3, margin: 10, layout: 'left' },
                      600: { columns: 4, margin: 15, layout: 'left' },
                      800: { columns: 4, margin: 15, layout: 'left' },
                      1024: { columns: 5, margin: 20, layout: 'left' }
                    }}
                />
                <p>This is not all, check the rest in my <a href="http://matena.deviantart.com/gallery/"
                                                            target="_blank">deviantART gallery</a>.</p>
                <p>Or check <a href="http://springcomic.com/" target="_blank">my comic project</a> for more art.</p>

              </div>
            </Element>
            <Element name="_about" className="content content-about content-last">
              <div className="contentIn contentWidth">
                <h2>About</h2>
                <h3><span>Panna Zsámba</span></h3>
                <h4>Front-end developer & UX/UI designer</h4>
                <div className="aboutData">
                  <div className="aboutLinks">
                    <a className="link-highlight cv" href="/cv_panna_zsamba.pdf" target="_blank">Download CV <span>(433 Kb, PDF)</span></a>
                    <a className="link-highlight linkedin" href="https://linkedin.com/in/pannazsamba" target="_blank">My
                      LinkedIn</a>
                  </div>
                  <div className="imgContainer"><img src={aboutImg} alt="Panna"/></div>
                </div>
              </div>
            </Element>
          </div>

          <Element name="_contact" className="pageBottom">
            <div className="pageBottomIn contentWidth">
              <h2>Contact</h2>
              <p className="phone">+36 20 521 9379 <span className="details">(9 AM - 5 PM weekdays, GMT +1)</span></p>
              <p className="email"><a href="mailto:pannarajzol.design@gmail.com">pannarajzol.design@gmail.com</a></p>
              <a className="link-highlight cv" href="/cv_panna_zsamba.pdf" target="_blank">Download CV <span>(433 Kb, PDF)</span></a>
              <p className="copy">Artwork, design and content &copy; Panna Zs&aacute;mba.</p>
            </div>
          </Element>

        </div>
    );
  }
}

export default App;
