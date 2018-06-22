import React, { Component } from 'react'

import { categories, featured, favourites } from '../../util/categories'
import CuisineHeader from '../common/CuisineHeader'
import DeliverySection from './DeliverySection'
import NearbySection from './NearbySection'
import '../../style/cuisine.css'

import ProductTiles from './ProductTiles';

class Cuisine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      delivery: true,
      pickup: false,
    }
  }

  Loading = (loading) => {
    this.setState({ loading })
  }

  handleDelivery = () => {
    this.setState({
      delivery: true,
      pickup: false
    })
  }

  handlePickup = () => {
    this.setState({
      pickup: true,
      delivery: false
    })
  }

  render() {
    const {delivery, pickup} = this.state;
    return (
      <div className="cuisine-page">
        {this.state.loading && <div className="horizontal-loader"></div>}
        <CuisineHeader />
        <div className="cuisine-body">
          <div className="cuisine-scroll">
            { pickup ?
              <div className="delivery-nearby" >
                <DeliverySection
                  Loading={this.Loading}
                  handleDelivery={this.handleDelivery}
                  handlePickup={this.handlePickup}
                  delivery={delivery}
                  pickup={pickup}
                />
                <NearbySection />
              </div>
               :
              <div>
                <DeliverySection
                  Loading={this.Loading}
                  handleDelivery={this.handleDelivery}
                  handlePickup={this.handlePickup}
                  delivery={delivery}
                  pickup={pickup}
                />
                <ProductTiles
                  items={featured}
                  sectionName="featured"
                />
                <ProductTiles
                  items={favourites}
                  sectionName="favourites"
                />
                <ProductTiles
                  items={categories}
                  sectionName="categories"
                />
                <NearbySection />
              </div>
            }
          </div>
        </div>
      </div >
    )
  }
}

export default Cuisine;
