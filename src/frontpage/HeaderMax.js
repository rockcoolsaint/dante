
import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../style/App.css'
import SimpleForm from './autoComplete'
import lib from '../util/lib'
import ajx, { mapStateToProps } from '../util/ajax'


class HeaderMax extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
	}

	isLoading = (loading) => {
		this.setState({ loading })
	}

	render() {
		return (
			<div>
				{this.state.loading && <div className="horizontal-loader"></div>}
				<div id='head' className="myheader ab">
					<Link to="/">
						<img src={ajx.logo}
							id="logo"
							alt="logo" />
					</Link>
					{(!this.props.user.isAuthenticated) ?
						<div className="header-top-button">
							<button className="max-sign-in"
								onClick={() => lib.toggleSignin()}>
								Sign In
						</button>
							<button className="btn-red max-sign-up"
								onClick={() => lib.toggleSignUp()} >
								Sign Up
						</button>
						</div> :
						<div className=" m-info">
							<div className="m-profile-photo-holder hh">
								<div className="m-user-icon-holder display-toggle">
									<img src={this.props.user.user.profile_photo}
										alt=""
										className="m-profile-photo" />
								</div>
								<div className="m-profile-options display-toggle">
									<Link to="/profile"
										className="lin m-options" >
										Account
								</Link>
									<a className="m-options"
										onClick={lib.signout}>
										Log Out
								</a>
								</div>
							</div>
						</div>
					}
					<p id="search-text">
						<b>Find the food that matches your taste around you</b>
					</p>
					<div className="search-box max-search fdp">
						<SimpleForm
							isLoading={this.isLoading}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(HeaderMax)
