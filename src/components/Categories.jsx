import React, { Component } from 'react'

import CuisineMinHeader from './common/CuisineMinHeader'
import { favourites } from '../util/categories'
import '../style/category.css'

class Categories extends Component {
  render() {
    const { cuisineName } = this.props.match.params;
    return (
      <div className="cuisine-categories">
        <CuisineMinHeader
          otherPage
        />
        <h1>{cuisineName.replace(/-/g, ' ')}</h1>
        <div className="container">
          <div className="row">
            {favourites.map((favourite) =>
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={favourite.id}>
                <a href="!#">
                  <img
                    src={favourite.image}
                    alt="feature-dish"
                    className="img-responsive"
                  />
                </a>
                <h3>{favourite.name}
                  <span>{favourite.icon ? <img className="checked-icon" src={favourite.icon} alt="check-icon" /> : ''}</span>
                  {favourite.badge ? <span className="new-badge">{favourite.badge}</span> : ''}
                </h3>
                <p>
                  {
                    favourite.price &&
                    <span>
                      {favourite.price} Delivery
                      <strong> &middot; </strong>
                    </span>
                  }
                  {favourite.deliveryTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Categories;
