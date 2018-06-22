import React from 'react';
import '../style/checkoutPage.css';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import GoHome from 'react-icons/lib/fa/home';
import FaStickyNote from 'react-icons/lib/fa/sticky-note';
import FaCreditCardAlt from 'react-icons/lib/fa/credit-card-alt';
import lib from '../util/lib'
import propTypes from 'prop-types'
import SimpleForm from '../frontpage/autoComplete'
import MdEdit from 'react-icons/lib/md/mode-edit'

const checkoutPage =(props)=>{	
	const handledelivery=(e)=>{
		e.persist()
		lib.savedeliveryinfo(e.currentTarget.value)
	}
	const handleApartmentinfo=(e)=>{
		e.persist()
		lib.saveapartmentinfo(e.currentTarget.value)
	}
		return( 
			<div id="deliveryInformation" >
				{(!props.user.isAuthenticated)?
				<div className="btn-Holder">
					<h3 className="instruction">
						Sign in or sign up with a Bukka account
					</h3>
					<button onClick={()=>lib.toggleSignUp()} className="btn-red">Sign Up</button>
					<button onClick={()=>lib.toggleSignin()}>Sign In</button>
				</div> : 
				(window.innerWidth<784)?
				<div className="btn-Holder">
					<button onClick={()=>lib.signout()}
							className="vvsi">
							Sign Out
					</button>
				</div>:
				null 
				}
				<h3 id="d-info">Delivery Info</h3>
				{
				(props.isRestaurant)?
					<span className="ishi">
						<SimpleForm className="isop"/>
					</span>:
					<div className="infoholder">
					<input value={props.address.Location} className="input-add" readOnly/>
					<span className="icon" style={{color:'black'}}>
						<FaMapMarker/>
					</span>
					</div>
				}
				<div className="infoholder">
				<input placeholder="Apartment/Suite/Floor..." 
					   className="hideBorder inputs"
					   onChange={handleApartmentinfo} />
				<span className="icon l-icon-small">
					<GoHome/>
				</span>
				</div>

				<div className="infoholder">
				<input 	placeholder="Add delivery note" 
						className="hideBorder inputs"
						onChange={handledelivery} />
				<span className="icon l-icon-small" >
					<FaStickyNote/>
				</span>
				</div>
				{(props.user.isAuthenticated)? 
					(props.user.fetched_lastCardDigits)? 
							<div  className="carddetails">
								<h2 className="carddetailsheader" >
									Payment Info
								</h2>
								<p id="card-logo">
									<FaCreditCardAlt/>
								</p>  
								<p id="card-number">
									XXXX XXXX XXXX {props.user.lastCardDigits}
								</p>
								
								<p 	className="mert"
									onClick={()=>lib.toggleShowcard()}>
									<MdEdit/>
								</p>
								</div>:
								<div className="btn-Holder">
									<button onClick={()=>lib.toggleShowcard()} 
											className="btn-red">
											Add Card
									</button>
								</div>
								:null
							}
			</div>
			)
	}
export default checkoutPage;

checkoutPage.propTypes={
	user:propTypes.object.isRequired,
	address:propTypes.object.isRequired
}