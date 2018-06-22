import './Appstyle.css';
import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Famarker from 'react-icons/lib/fa/map-marker';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.setAddress(this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  handleSelect = (address) => {
    this.setState({ address: address });
    this.props.setAddress(address);
  }
  handleEnter = (address) => {
    this.setState({ address: address });
    this.props.setAddress(address);
  }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      type: 'search',
      placeholder: 'Search Places...',
      autoFocus: true,
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div><Famarker style={{ marginRight: '5px', fontSize: '1em', color: 'grey', marginTop: '-3px' }} />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    );
    const styleAddress = {
      autocompleteContainer: { backgroundColor: 'green', width: '350px', marginLeft: '24px', marginTop: '-10px' },
      autocompleteItem: { color: 'black', fontSize: '1.5em' },
      autocompleteItemActive: { color: 'blue' }
    }
    const LocaClasses = {
      input: 'autoCon1',
      autocompleteContainer: 'autoCon2',
      googleLogoImage: 'Glogo'
    }

    return (
      <PlacesAutocomplete
        inputProps={inputProps}
        classNames={LocaClasses}
        autocompleteItem={AutocompleteItem}
        onSelect={this.handleSelect}
        onEnterKeyDown={this.handleEnter}
      />
    )
  };
}

export default SimpleForm
