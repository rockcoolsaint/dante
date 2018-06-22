import React from 'react';
import '../style/profile.css';
import Paymentinfo from '../profile/paymentinformation';
import Orderhistory from '../profile/orderhistory';
import Notification from '../profile/Notification';
import Basicinformation from '../profile/BasicInformation'
import HeaderMin from '../frontpage/HeaderMin';
import {connect} from 'react-redux';
import lib from '../util/lib'
import {mapStateToProps} from '../util/ajax'

 const profile =(props)=>{
	return(
		<div className="l-profilepage l-grey-background">
			<HeaderMin  isrestaurant={true}/>
			<h3 className="l-space-around l-headeri">
				Manage Account
			</h3>
			<ul className="l-menu l-right-padding l-white-background l-height l-menu-border">
				<li className="l-menu-item l-select" 
					data-key="menuItem-one" 
					id="menuItem-one" 
					onClick={(e)=>lib.showbasicinformation(e)}>
					Profile
				</li>
				<li className="l-menu-item" 
					data-key="menuItem-two" 
					id="menuItem-two" 
					onClick={(e)=>lib.showorderhistory(e)}>
					Order History
				</li>
				<li className="l-menu-item payment" 
					data-key="menuItem-three" 
					id="menuItem-three" 
					onClick={(e)=>lib.showpaymentinfo(e)} >
					Payment Information
				</li>
				<li className="l-menu-item" 
					data-key="menuItem-four" 
					id="menuItem-four" 
					onClick={(e)=>lib.shownotification(e)}>
					Notification Settings
				</li>
			</ul>
		{(props.page.showpaymentinfo)? 
			<Paymentinfo user={props.user} />:
			null
		}
		{(props.page.showbasicinformation)? 
			<Basicinformation user={props.user} />:
			null
		}
		{(props.page.showorderhistory)? 
			<Orderhistory user={props.user} />:
			null
		}
		{(props.page.shownotification)? 
			<Notification user={props.user} />:
			null
		}
		</div>
		)
}

export default connect(mapStateToProps)(profile);