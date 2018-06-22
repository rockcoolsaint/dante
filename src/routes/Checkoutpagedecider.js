import React,{Component} from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import Checking from './checking';
import {mapStateToProps} from '../util/ajax'
import lib from '../util/lib'

class checkoutpagedecider extends Component {
        
        componentWillUnmount(){
		lib.previouspath(this.props.location.pathname)
	}
        render(){
        const pp=this.props.page.prevpath||"/"
        return(
            (Object.keys(this.props.cart.cart).length)? 
             (this.props.chef.fetched_chefsInYourArea)?   
                <Checking/>:
                <Redirect to={pp} />:
                <Redirect to='/'/>
                )
        }
}

export default connect(mapStateToProps)(checkoutpagedecider)