import React,{Component} from 'react'
import { Redirect } from "react-router-dom"
import {connect} from 'react-redux'
import Receipt from './receiptRoute'
import {mapStateToProps} from '../util/ajax'
import lib from '../util/lib'

class ReceiptHandlerRoute extends Component{
    componentDidMount(){
		lib.previouspath(this.props.location.pathname)
	}

    render(){
    return(
    (this.props.receipt.receiptGenerated)?
        <Receipt />:
        <Redirect to="/"/>
    )
}
}
export default connect(mapStateToProps)(ReceiptHandlerRoute)