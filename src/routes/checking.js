import React from 'react'
import '../style/App.css'
import '../style/index.css'
import PageBackground from '../frontpage/gmap'
import CheckoutPage from '../checkout/checkoutPage'
import CheckoutSlip from '../checkout/checkoutSlip'
import { connect } from 'react-redux'
import HeaderCheckout from '../frontpage/HeaderCheckout'
import Footer from '../components/common/Footer'
import Receipt from './redirectToReceipt'
import OptionLeaf from '../frontpage/OptionLeaf'
import { mapStateToProps } from '../util/ajax'
import OrderError from '../frontpage/orderError'
import lib from '../util/lib'


const Checking = (props) => {
	return (
		(props.receipt.receiptGenerated) ?
			<Receipt /> :
			<div className="devi">

				<HeaderCheckout />

				<PageBackground one={true}
					bloc={{ lat: props.address.lat, lng: props.address.lng }} />
				<div id="checking-content-holder">
					<CheckoutPage user={props.user}
						address={props.address}
						isRestaurant={props.page.isRestaurant} />
					<CheckoutSlip />
				</div>
				<OptionLeaf />
				<Footer />
				{
					(props.page.showordererrorpage) ?
						<OrderError error={props.user.orderstatus.message}
							evnt={() => lib.toggleshoworder_error()} /> :
						null
				}
				{
					(props.user.transactionError.isError) ?
						<OrderError error={props.user.transactionError.error}
							evnt={() => lib.toggleTransactionError('')} /> :
						null
				}

			</div>
	)
}

export default connect(mapStateToProps)(Checking)
