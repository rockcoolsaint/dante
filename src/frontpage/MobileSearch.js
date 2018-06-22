import React from 'react'
import SearchBox from './autoComplete'
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import { NavLink } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import lib from '../util/lib'
import ajx, { mapStateToProps } from '../util/ajax'
import { connect } from 'react-redux'

class MobileSearch extends React.Component {
    render() {
        return (

            <div>
                <div>
                    <NavLink to="" activeClassName="selected">
                        <FaArrowLeft style={{ marginBottom: '10px', marginTop: '10px' }} />
                    </NavLink>
                </div>
                <div>
                    <SearchBox />
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps)(MobileSearch)
