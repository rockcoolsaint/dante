import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBox from '../frontpage/autoComplete'
import { Link, Redirect } from 'react-router-dom'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Faarrow from 'react-icons/lib/md/arrow-back'

import '../style/App.css'
import ErrorChef from './Error'
import lib from '../util/lib'
import { mapStateToProps } from '../util/ajax'

class MobileSearch extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false }
    }

    isLoading = (loading) => {
        this.setState({ loading })
    }

    render() {
        const pp = this.props.page.prevpath || "/"
        return (
            (window.innerWidth > 783) ?
                <Redirect to={pp} /> :
                (this.props.chef.error) ?
                    <ErrorChef /> :
                    (this.props.page.isRestaurant) ?
                        <div className="pipip">
                            <Link to={pp}>
                                <Faarrow className="pickle" />
                            </Link>
                            <SearchBox
                                isLoading={this.isLoading}
                                mobileroute="picklu" />
                        </div> :
                        (this.props.chef.fetching_chefAndCuisine) ?
                            <Redirect to="/Cuisine" /> :
                            <div>
                                {this.state.loading && <div className="horizontal-loader"></div>}
                                <div className="pipip">
                                    <Link to={pp}>
                                        <Faarrow className="pickle" />
                                    </Link>
                                    <SearchBox
                                        isLoading={this.isLoading}
                                        mobileroute="picklu" />
                                </div>
                            </div>
        )
    }
}
export default connect(mapStateToProps)(MobileSearch)
