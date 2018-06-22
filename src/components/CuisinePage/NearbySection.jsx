import React, { Component } from 'react'
import { connect } from 'react-redux'

import lib from '../../util/lib.js'
import { mapStateToProps } from '../../util/ajax'
import CuisineLoader from './CuisineLoader'
import check from '../../assets/images/checked.svg'

class NearbySection extends Component {
  render() {
    const { chefsInYourArea } = this.props.chef;
    return (
      <div className="nearby">
        <div className="nearby-cuisine">
        <h2>Nearby</h2>
        <hr />
        <div className="row">
        {(Object.values(chefsInYourArea).map((cuisine, key) =>
          <div key={key} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <img
              src={cuisine.profile_photo}
              alt="feature-dish"
              className="img-responsive"
              onClick={() => lib.updatechefbycuisine(cuisine)}
              onMouseOver={this.cuisineHover}
            />
            <h3>{cuisine.cuisine}
              <span><img src={check} alt="check-icon" /></span>
              <span className="new-badge">NEW</span>
            </h3>
            <p>
              {cuisine.delivery_charge ?
                <span>
                  N{cuisine.delivery_charge} Delivery
                         <strong> &middot; </strong>
                </span> : null
              }
              30-45 min
                  </p>
          </div>
        )
        )}
         </div>
        <CuisineLoader />
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps)(NearbySection);
