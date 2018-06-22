import React, { Component } from 'react'
import { connect } from 'react-redux'
import Geocode from "react-geocode";
import PlacesAutocomplete, { geocodeByAddress, getLatLng }
  from 'react-places-autocomplete'

import { mapStateToProps } from '../../util/ajax'
import lib from '../../util/lib'
import locationIcon from '../../assets/images/placeholder.svg'
import deliveryIcon from '../../assets/images/delivery-icon.svg'

class DeliverySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchMenu: false,
      address: ''
    }
    this.handleOnChange = (address) => this.setState({ address });
  }

  handleOnClick = () => {
    this.setState({ showSearchMenu: true }, () => {
      document.addEventListener("click", this.closeDropdownMenu);
    });
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
    this.props.Loading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      Geocode.fromLatLng(lat, lng).then(
        response => {
          const address = response.results[0].formatted_address;

          geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(this.props.Loading(false))
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
    this.props.Loading(true)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(this.setState({
        address: ''
      }))
      .then(latLng => { lib.address(address, latLng); lib.chefResult(latLng) })
      .then(this.props.Loading(false))
      .catch(error => console.error('Error', error))
  }

  handleEnter = (address) => {
    this.setState({ address })
    this.props.Loading(true)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(this.setState({
        address: ''
      }))
      .then(latLng => { lib.address(address, latLng); lib.chefResult(latLng); })
      .then(this.props.Loading(false))
      .catch(error => console.error('Error', error))
  }

  render() {
    const { Location } = this.props.address;
    const { delivery, pickup, handleDelivery, handlePickup } = this.props;
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
      <div className="delivery">
        <span id="delivery-section">
          <span
            className={delivery ? 'active deliver' : 'deliver'}
            onClick={handleDelivery}>
            Delivery
          </span>
          <span className="or">or</span>
          <span
            className={pickup ? 'active pickup' : 'pickup'}
            onClick={handlePickup}>
            Pickup
          </span>
          <div className="vertical-line"></div>
          {
            Location ?
              <span className="address" onClick={this.handleOnClick}>
                <img src={locationIcon} alt="location-icon" />
                <span>{Location.split(",")[0]}</span>
              </span> : null
          }
          <span className="view-map">
            {pickup ?
              <button>View Map</button>
              :
              null
            }
          </span>
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
    )
  }
}

export default connect(mapStateToProps)(DeliverySection);
