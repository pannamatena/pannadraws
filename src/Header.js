import React, { Component } from 'react';
import logo from './img/logo.svg';
import { animateScroll, scroller } from 'react-scroll';
import ClickOutside from 'react-click-outside';

class Header extends Component {

  /**
   * Instantiates a header component.
   */
  constructor () {
    super();

    this.state = {
      isScrolled: false,
      isMenuOpened: false
    };

    // because we refer to a property of a react component (state) in checkIfScreenIsScrolled
    // we need to bind the function to 'this'.
    this.checkIfScreenIsScrolled = this.checkIfScreenIsScrolled.bind(this);
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
    this.createMenuItemClickHandler = this.createMenuItemClickHandler.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  /**
   * Adds event listener on component mount.
   */
  componentDidMount () {
    window.addEventListener('scroll', this.checkIfScreenIsScrolled);
  }

  /**
   * Removes event listener on component unmount.
   */
  componentWillUnmount () {
    window.removeEventListener('scroll', this.checkIfScreenIsScrolled);
  }

  /**
   * Changes the isScrolled state when window is scrolled.
   *
   * @private
   */
  checkIfScreenIsScrolled () {
    const scrollTop = window.scrollY;
    this.setState({
      isScrolled: scrollTop !== 0
    });
  }

  /**
   * Opens or closes the menu.
   *
   * @private
   */
  toggleMenuOpen () {
    this.setState({
      isMenuOpened: !this.state.isMenuOpened
    });
  }

  /**
   * Scrolls to the top of the page.
   *
   * @private
   */
  scrollToTop () {
    animateScroll.scrollToTop({ duration: 400 });
  }

  /**
   * Creates a scroll event handler that scrolls the window to the given element.
   *
   * @param elementName - Element to scroll to
   * @returns {function} The scroll event handler
   * @private
   */
  createMenuItemClickHandler (elementName) {
    return () => {
      const offset = -this.refs.headerContainer.clientHeight;
      scroller.scrollTo(elementName, {
        duration: 400,
        smooth: true,
        offset
      });
      this.closeMenu();
    }
  }

  /**
   * Closes the menu.
   *
   * @private
   */
  closeMenu () {
    this.setState({
      isMenuOpened: false
    });
  }

  /**
   * Renders the component.
   */
  render () {
    return (
        <div className="pageTopIn">
          <div ref="headerContainer"
               className={(this.state.isScrolled ? 'stickyHeader' : '') + ' header ' + (this.state.isMenuOpened ? 'open' : '')}>
            <div className="headerIn contentWidth">
              <a className="logo scrollLink" onClick={this.scrollToTop} href="javascript:"><img src={logo}
                                                                                                alt="PannaDraws"/></a>
              <ClickOutside className="menuContainer" onClickOutside={this.closeMenu}>
                <a id="_menuOpener" className="menuOpener" onClick={this.toggleMenuOpen} href="javascript:">&nbsp;</a>
                <div id="_topMenu" className={'topMenu ' + (this.state.isMenuOpened ? 'open' : '')}>
                  <a className="scrollLink stickyLink" onClick={this.createMenuItemClickHandler('_graphicDesign')}
                     href="javascript:">Front-end dev</a>
                  <a className="scrollLink stickyLink" onClick={this.createMenuItemClickHandler('_graphicDesign')}
                     href="javascript:">Graphic design</a>
                  <a className="scrollLink stickyLink" onClick={this.createMenuItemClickHandler('_illustration')}
                     href="javascript:">Illustration</a>

                  <a className="scrollLink" onClick={this.createMenuItemClickHandler('_about')} href="javascript:">About</a>
                  <a className="scrollLink" onClick={this.createMenuItemClickHandler('_contact')} href="javascript:">Contact</a>
                </div>
              </ClickOutside>

            </div>
          </div>
          <div id="_mainMenu"
               className={(this.state.isScrolled ? 'stickyHeader' : '') + ' mainMenu contentWidth'}> {/*hidden*/}
            <a className="scrollLink" onClick={this.createMenuItemClickHandler('_graphicDesign')} href="javascript:">Front-end
              dev</a>
            <span className="separator">&nbsp;</span>
            <a className="scrollLink first" onClick={this.createMenuItemClickHandler('_graphicDesign')}
               href="javascript:">Graphic design</a>
            <span className="separator">&nbsp;</span>
            <a className="scrollLink" onClick={this.createMenuItemClickHandler('_illustration')} href="javascript:">Illustration</a>
          </div>
        </div>
    );
  }
}

export default Header;
