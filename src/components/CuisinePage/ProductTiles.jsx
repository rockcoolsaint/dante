import React from 'react';
import { Link } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to'

import rightArrow from '../../assets/images/rightArrow.svg'
import leftArrow from '../../assets/images/back.svg'
import CuisineLoader from './CuisineLoader'

class ProductTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: false,
      scrollRight: false
    }
  }

  componentDidMount() {
    this.setState({
      scrollRight: true
    });
  }

  handleNextButtonVisibility(totalScrollLeft, totalWidth) {
    if (totalScrollLeft < totalWidth) {
      this.setState({
        scrollLeft: true
      });
    }
    if (totalScrollLeft >= totalWidth) {
      this.setState({
        scrollRight: false
      });
    }
  }

  handlePrevButtonVisibility(desiredOffset) {
    if (desiredOffset <= 0) {
      this.setState({
        scrollLeft: false,
        scrollRight: true
      });
    }
  }

  handleNextScroll(imageWidth, containerMargin, innerScroll, options) {
    const slideWidth = imageWidth + parseInt(containerMargin, 10);
    const desiredOffset = innerScroll + slideWidth;
    animateScrollTo(desiredOffset, options);
  }

  handlePreviousScroll(imageWidth, containerMargin, innerScroll, options) {
    const slideWidth = imageWidth + parseInt(containerMargin, 10);
    const desiredOffset = innerScroll - slideWidth;
    animateScrollTo(desiredOffset, options);

    this.handlePrevButtonVisibility(desiredOffset);
  }

  handleNext = (event, element) => {
    const { sectionName } = this.props;
    const options = {
      speed: 500,
      minDuration: 500,
      maxDuration: 1500,
      element: element,
      horizontal: true,
      cancelOnUserAction: true
    };

    let imageWidth;
    let imageContainer;
    let containerMargin;

    switch (sectionName) {
      case 'featured':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.featured .content-img');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      case 'favourites':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.favourites .content');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      case 'categories':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.top-categories .content');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      default:
        imageWidth = 250;
        containerMargin = 0;
    }

    const innerScroll = element.scrollLeft
    const totalScrollLeft = innerScroll + element.clientWidth;
    const imageLength = this.props.items.filter(item => item.image).length;
    const totalWidth = imageLength * imageWidth;

    this.handleNextButtonVisibility(totalScrollLeft, totalWidth);
    this.handleNextScroll(imageWidth, containerMargin, innerScroll, options)
  }

  handlePrev = (event, element) => {
    const { sectionName } = this.props;
    const options = {
      speed: 500,
      minDuration: 500,
      maxDuration: 1500,
      element: element,
      horizontal: true,
      cancelOnUserAction: true
    };

    let imageWidth;
    let imageContainer;
    let containerMargin;

    switch (sectionName) {
      case 'featured':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.featured .content-img');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      case 'favourites':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.favourites .content');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      case 'categories':
        imageWidth = document.getElementById(sectionName).width;
        imageContainer = document.querySelector('.top-categories .content');
        containerMargin = window.getComputedStyle(
          imageContainer, null).getPropertyValue('margin-right');
        break
      default:
        imageWidth = 250;
        containerMargin = 0;
    }

    const innerScroll = element.scrollLeft

    this.handlePreviousScroll(imageWidth, containerMargin, innerScroll, options);
  }

  render() {
    const { sectionName, items } = this.props;
    const { scrollLeft, scrollRight } = this.state;
    return (
      <div className="all-products">
        {sectionName === "featured" &&
          <div className="featured">
            <h2>Featured</h2>
            <hr />
            <div className="featured-box">
              <div className="featured-img scrollDiv">
              {
                  scrollLeft &&
                  <div className="left-arrow"
                    onClick=
                    {(event) =>
                      this.handlePrev(event,
                        document.querySelector(".scrollDiv")
                      )}
                  >
                    <img src={leftArrow} alt="left-arrow" />
                  </div>
                }
                {
                  items.length >= 3 && scrollRight &&
                  <div className="right-arrow"
                    onClick=
                    {(event) =>
                      this.handleNext(event,
                        document.querySelector(".featured .scrollDiv")
                      )}
                  >
                    <img src={rightArrow} alt="right-arrow" />
                  </div>
                }
                
                {items.map((featured) =>
                  <div className="content-img" key={featured.id}>
                    <Link to="">
                      <img
                        id="featured"
                        src={featured.image}
                        alt="featured-dish"
                        className="img-responsive"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>}

        {sectionName === "favourites" &&
          <div className="favourites">
            <h2>Bukka Favourites</h2>
            <hr />
            <div className="favourite-box">
              <div className="favourite-img scrollDiv">
                {
                  items.length >= 4 && scrollRight &&
                  <div className="right-arrow"
                    onClick=
                    {(event) =>
                      this.handleNext(event,
                        document.querySelector(".favourites .scrollDiv")
                      )}
                  >
                    <img src={rightArrow} alt="right-arrow" />
                  </div>
                }
                {
                  scrollLeft &&
                  <div className="left-arrow"
                    onClick=
                    {(event) =>
                      this.handlePrev(event,
                        document.querySelector(".favourites .scrollDiv")
                      )}
                  >
                    <img src={leftArrow} alt="left-arrow" />
                  </div>
                }
                {items.map((favourite) =>
                  <div className="content" key={favourite.id}>
                    <a href="!#">
                      <img
                        id="favourites"
                        src={favourite.image}
                        alt="feature-dish"
                        className="img-responsive"
                      />
                    </a>
                    <h3>{favourite.name}
                      <span>
                        {favourite.icon ?
                          <img
                            className="checked-icon"
                            src={favourite.icon}
                            alt="check-icon"
                          /> : ''}
                      </span>
                      {favourite.badge ?
                        <span className="new-badge">
                          {favourite.badge}
                        </span> : ''
                      }
                    </h3>
                    <p>
                      <span>
                        {favourite.price ?
                          `${favourite.price} Delivery` : ''
                        }
                      </span>
                      <strong> &middot; </strong>
                      {favourite.deliveryTime}
                    </p>
                  </div>
                )}
                <CuisineLoader />
              </div>
            </div>
          </div>}

        {sectionName === "categories" &&
          <div className="top-categories">
            <h2>Top Categories</h2>
            <hr />
            <div className="categories-box">
              <div className="categories-img scrollDiv">
                {
                  items.length >= 7 && scrollRight &&
                  <div className="right-arrow"
                    onClick=
                    {(event) =>
                      this.handleNext(event,
                        document.querySelector(".top-categories .scrollDiv")
                      )}
                  >
                    <img src={rightArrow} alt="right-arrow" />
                  </div>
                }
                {
                  scrollLeft &&
                  <div className="left-arrow"
                    onClick=
                    {(event) =>
                      this.handlePrev(event,
                        document.querySelector(".top-categories .scrollDiv")
                      )}
                  >
                    <img src={leftArrow} alt="left-arrow" />
                  </div>
                }
                {(Object.values(items).map((cuisine, key) => {
                  return (
                    <div className="content" key={key}>
                      <Link to={`/categories/${cuisine.name}`}>
                        <img
                          id="categories"
                          src={cuisine.image}
                          alt="feature-dish"
                          className="img-responsive"
                          style={{ height: '200px', width: '170px' }}
                        />
                        <span className="category-type">{cuisine.name}</span>
                      </Link>
                    </div>
                  )
                }))}
                <CuisineLoader />
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default ProductTiles;
