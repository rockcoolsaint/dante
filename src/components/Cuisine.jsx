import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Geocode from "react-geocode";
import PlacesAutocomplete, { geocodeByAddress, getLatLng }
  from 'react-places-autocomplete'

import { mapStateToProps } from '../util/ajax.js'
import lib from '../util/lib.js'
import { categories, features, favourites } from '../util/categories'
import CuisineHeader from './common/CuisineHeader'
import locationIcon from '../assets/images/placeholder.svg'
import check from '../assets/images/checked.svg'
import deliveryIcon from '../assets/images/delivery-icon.svg'
import '../style/cuisine.css'

class Cuisine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchMenu: false,
      loading: false,
      address: '',
      cuisineStyle: {
        position: '',
        zIndex: '',
        width: '',
        height: '',
        background: ''
      }
    }
    this.handleOnChange = (address) => this.setState({ address });
  }

  Loading = (loading) => {
    this.setState({ loading })
  }

  handleOnClick = () => {
    this.setState({ showSearchMenu: true }, () => {
      document.addEventListener("click", this.closeDropdownMenu);
    });
  }

  cuisineHover = () => {
    this.setState({
      cuisineStyle: {
        position: 'absolute',
        zIndex: '1',
        width: '400px',
        height: '200px',
        background: 'linear-gradient(-90deg,  rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.4))'
      }
    })
  }

  closeDropdownMenu = event => {
    if (this.deliveryDropdownMenu) {
      if (!this.deliveryDropdownMenu.contains(event.target)) {
        document.removeEventListener("click", this.closeDropdownMenu);
        this.setState({ showSearchMenu: false })
      }
    }
  }

  handleCurrentLocation = () => {
    this.Loading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      Geocode.fromLatLng(lat, lng).then(
        response => {
          const address = response.results[0].formatted_address;

          geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(this.Loading(false))
            .then(latLng => { lib.address(address, latLng); lib.chefResult(latLng) })
            .catch(error => console.error('Error', error))
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  handleSelect = (address, placeId) => {
    this.setState({ address, placeId })
    this.Loading(true)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(this.setState({
        address: ''
      }))
      .then(latLng => { lib.address(address, latLng); lib.chefResult(latLng) })
      .catch(error => console.error('Error', error))
  }

  handleEnter = (address) => {
    this.setState({ address })
    this.Loading(true)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(this.setState({
        address: ''
      }))
      .then(latLng => { lib.address(address, latLng); lib.chefResult(latLng); })
      .catch(error => console.error('Error', error))
  }

  render() {
    const { Location } = this.props.address;
    const { chefsInYourArea } = this.props.chef;
    const inputProps = {
      value: this.state.address,
      onChange: this.handleOnChange,
      placeholder: 'Enter your delivery address...'
    }
    const cssClasses = {
      autocompleteContainer: 'location-dropdown'
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div id="location-name">
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    )
    return (
      <div className="cuisine-page">
        {this.state.loading && <div className="horizontal-loader"></div>}
        <CuisineHeader />
        <div className="cuisine-body">
          <div className="cuisine-scroll">
            <div className="delivery">
              <span id="delivery-section">
                <Link to="" className="active">Delivery</Link>
                or
                <Link to="">Pickup</Link>
                <div className="vertical-line"></div>
                {
                  Location ?
                    <span className="address" onClick={this.handleOnClick}>
                      <img src={locationIcon} alt="location-icon" />
                      {Location.split(",")[0]}
                    </span> : null
                }
              </span>
              <div className="container">
                <div className="col-lg-offset-1">
                  <div
                    className="delivery-dropdown"
                    ref={(element) => { this.deliveryDropdownMenu = element; }}>
                    {this.state.showSearchMenu ?
                      <ul>
                        <li>
                          <div className="input-group">
                            <span
                              className="input-group-addon">
                              <i className="glyphicon glyphicon-search"></i>
                            </span>
                            <PlacesAutocomplete
                              classNames={cssClasses}
                              inputProps={inputProps}
                              autocompleteItem={AutocompleteItem}
                              onEnterKeyDown={this.handleEnter}
                              onSelect={this.handleSelect}
                              googleLogo={false}
                            />
                          </div>
                        </li>
                        <div id="horizontal-line"></div>
                        <li>
                          <span>
                            <img
                              src={deliveryIcon}
                              id="search-icon"
                              alt="delivery-icon"
                            />
                          </span>
                          <span
                            className="current-location"
                            onClick={this.handleCurrentLocation}>
                            Use Current Location
                          </span>

                        </li>
                      </ul>
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="feature">
              <h2>Featured</h2>
              <hr />
              <div className="feature-box">
                <div className="feature-img">
                  {features.map((feature) =>
                    <div className="content-img" key={feature.id}>
                      <a href="!#">
                        <img
                          src={feature.image}
                          alt="feature-dish"
                          className="img-responsive"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="favourites">
              <h2>Bukka Favourites</h2>
              <hr />
              <div className="favourite-box">
                <div className="favourite-img">
                  {favourites.map((favourite) =>
                    <div className="content" key={favourite.id}>
                      <a href="!#">
                        <img
                          src={favourite.image}
                          alt="feature-dish"
                          className="img-responsive"
                        />
                      </a>
                      <h3>{favourite.name}
                        <span>
                          {
                            favourite.icon ?
                              <img
                                className="checked-icon"
                                src={favourite.icon}
                                alt="check-icon"
                              /> : ''
                          }
                        </span>
                        {
                          favourite.badge ?
                            <span className="new-badge">
                              {favourite.badge}
                            </span> : ''
                        }
                      </h3>
                      <p>
                        <span>
                          {
                            favourite.price ?
                              `${favourite.price} Delivery`
                              : ''
                          }
                        </span>
                        <strong> &middot; </strong>{favourite.deliveryTime}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="top-categories">
              <h2>Top Categories</h2>
              <hr />
              <div className="categories-box">
                <div className="categories-img">
                  {(Object.values(categories).map((cuisine, key) => {
                    return (
                      <div className="content" key={key}>
                        <Link to={`/categories/${cuisine.name}`}>
                          <img
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
                  {
                    (this.props.chef.fetching_chefAndCuisine) ?
                      [1, 2, 3].map((cui, key) =>
                        <div className="col-sm-4 m" key={key} >
                          <div className="lt xyxaa"></div>
                          <h5 className="avci xyxaa"></h5>
                          <p className="avcib xyxaa"></p>
                        </div>) :
                      null
                  }
                </div>
              </div>
            </div>
            <div className="nearby">
              <h2>Nearby</h2>
              <hr />
              <div className="nearby-box">
                <div className="nearby-img">
                  {(Object.values(chefsInYourArea).map((cuisine, key) =>
                    <div key={key} className="content">
                      <div className="img-wrapper">
                        <img
                          src={cuisine.profile_photo}
                          alt="feature-dish"
                          className="img-responsive"
                          onClick={() => lib.updatechefbycuisine(cuisine)}
                          onMouseOver={this.cuisineHover}
                        />
                      </div>
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
                    </div>)
                  )}
                  {
                    (this.props.chef.fetching_chefAndCuisine) ?
                      [1, 2, 3].map((cui, key) =>
                        <div className="col-sm-4 m" key={key} >
                          <div className="lt xyxaa"></div>
                          <h5 className="avci xyxaa"></h5>
                          <p className="avcib xyxaa"></p>
                        </div>) :
                      null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cuisine);
