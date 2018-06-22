import React, { Component } from 'react'
import '../style/App.css'
import '../style/index.css'
import { connect } from 'react-redux'
import ErrorChef from './Error'
import { mapStateToProps } from '../util/ajax'
import lib from '../util/lib'
import HomePage from '../frontpage/HomePage'
import { Redirect } from "react-router-dom"

class App extends Component {
	componentWillMount() {
		if (!this.props.chef.fetching_chefAndCuisine) {
			lib.onRefresh()
		}
	}
	componentDidMount() {
		lib.previouspath(this.props.location.pathname)
	}

	render() {
		console.log(this.props.chef.fetching_chefAndCuisine)
		return (
			(this.props.chef.error) ?
				<ErrorChef /> :
				(!this.props.chef.fetching_chefAndCuisine) ?
					<HomePage /> :
					<Redirect to="/Cuisine" />
		)
	}
}

export default connect(mapStateToProps)(App)


