import React from 'react'
import '../style/App.css'
import '../style/index.css'
import PageBackground from '../frontpage/gmap'
import { connect } from 'react-redux'
import HeaderCheckout from '../frontpage/HeaderCheckout'
import Footer from '../components/common/Footer'
import Receipt from '../frontpage/receipt'
import { mapStateToProps } from '../util/ajax'
import { Redirect } from "react-router-dom"

const ReceiptRoute = (props) => {
    return (
        (!Object.keys(props.chef.yourChef).length) ?
            <Redirect to="/" /> :
            <div className="devi">
                <HeaderCheckout />
                <PageBackground bloc={{ lat: props.address.lat, lng: props.address.lng }}
                    aloc={{ lat: props.chef.yourChef.coords.lat, lng: props.chef.yourChef.coords.lng }} />
                <div id="checking-content">
                    <Receipt />
                </div>
                <Footer />
            </div>
    )
}

export default connect(mapStateToProps)(ReceiptRoute)
