import React, { Component } from 'react'
import Cuisine from '../components/CuisinePage/Cuisine'
import Footer from '../components/common/Footer'
import OptionLeaf from './OptionLeaf'
import '../style/App.css'
import { connect } from 'react-redux'
import { mapStateToProps } from '../util/ajax'

class CuisinePage extends Component {

	render() {
		return (
			<div className="devi aah">
				<Cuisine />
				<Footer />
				<OptionLeaf />
			</div>
		)
	}
}

export default connect(mapStateToProps)(CuisinePage)
