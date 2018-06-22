import React from 'react'
import '../style/App.css'
import '../style/index.css'
import Footer from '../components/common/Footer'
import ScrollLogic from '../frontpage/ScrollLogic'
import MobileAppComponent from '../frontpage/mobileAppComponent'
import SummaryComponent from '../frontpage/summaryComponent'
import { connect } from 'react-redux'
import OptionLeaf from '../frontpage/OptionLeaf'
import { mapStateToProps } from '../util/ajax'
import First from '../frontpage/FirstPagePreloader'
import PageBackground from '../frontpage/gmap'


const HomePage = (props) => (
	<div style={{ position: 'absolute' }}>
		<ScrollLogic chef_fetched={props.chef.fetched_chefsInYourArea}
			Located={props.address.Located} />
		<div className="first-page-background">
			<PageBackground one={true} />
		</div>
		<div className="dev">
			<SummaryComponent />
			<MobileAppComponent />
			<Footer />
			<OptionLeaf />
			{(props.page.showfirstpageloader) ?
				<First /> :
				null
			}
		</div>
	</div>
)

export default connect(mapStateToProps)(HomePage)
