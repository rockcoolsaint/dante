import React,{Component} from 'react'
import '../style/checkoutSlip.css'
import PageBackground from '../frontpage/gmap'
import {connect} from 'react-redux'
import lib from '../util/lib'
import ajx from '../util/ajax'
import Faspinner from 'react-icons/lib/fa/spinner'
import {mapStateToProps} from '../util/ajax'
import {Link} from 'react-router-dom'
 
class checkoutSlip extends Component {
	constructor(props){
		super(props)
		this.state={
			checkingBalance:false,
			error:false
		}
		this.placeorder=this.placeorder.bind(this)
	}
	deleteDiv=(e)=>{
		lib.deleteCart(e.currentTarget.dataset.key)
	}

	quantityUpdate=(e)=> {
		lib.quantityUpdate(e.currentTarget.value,e.currentTarget.dataset.key)
	}
	timewillpass=(e)=>{
		return lib.timewillpass().timewillpass
	}

	placeorder=()=>{
		if(!this.props.user.isAuthenticated){
			lib.toggleSignin()
		}
		else if(this.props.user.lastCardDigits===""){
			lib.toggleShowcard()
		}else if(!this.props.address.Located){
			alert("Please enter a delivery address")
		}else{ 
			//lib.processtransact()
			this.setState((prevState,props)=>({
				checkingBalance:true
			}))
			let total=parseInt(this.props.cart.total,10)*100
			lib.checkBalance(total)
			
		}
	}	
	handledelivery=(e)=>{
		e.persist()
		lib.savedeliveryinfo(e.currentTarget.value)
	}
	componentWillReceiveProps(nextProps){
		let _=this
		if(nextProps.user.transactionError.isError){
			_.setState((prevState)=>({
				checkingBalance:false
			}))
		}

		
	}
	render() {
	return(
		<div id="checkoutSlip">
			<img 	src={ajx[`${this.props.chef.currentCuisine}`]} 
					alt="food" 
					id="food-img" />
			<div id="food-card">
				<h4 id="order-call">
					Your order
				</h4>
				<h1>
					{(this.props.chef.yourChef.cuisine)? 
						this.props.chef.yourChef.cuisine+" cuisine":
						"No cuisine selected"
					}
				</h1>
				<h4 id="time">
					{(Object.keys(this.props.cart.cart).length)? 
						"ETA: "+this.timewillpass():
						"ETA Not applicable"
					}
				</h4>
				<h6 id ="eta">
					<em>(estimated time of arrival)</em>
				</h6>
				<div id="underline"></div>
			</div>
			<div id="small-screen-delivery-info">
				<div id="ssmap">
				<PageBackground one={true} bloc={{lat:this.props.address.lat,lng:this.props.address.lng}} />
				</div>
				<div id="ssaddress">
					{(this.props.page.isRestaurant)?
						<Link to="/Search" className="vinc">
							<input 	value={this.props.address.Location} 
									className="input-addi" 
									placeholder="Please enter a delivery address.."
									readOnly/>
						</Link>:
						<input 	value={this.props.address.Location} 
								className="input-addi" 
								placeholder="Please enter a delivery address.."
								readOnly/>
					}
					<input 	placeholder="Add delivery note..." 
							className="inputsi"
							onChange={this.handledelivery} />
				</div>
			</div>
			{(!this.props.user.orderstatus_fetching && !this.state.checkingBalance)?
				<button className="btn-red order-btn" 
						onClick={this.placeorder}>
					Place Order
				</button>:
				null
			}
			{(!this.props.user.orderstatus_fetching && this.state.checkingBalance)?
				<button className="btn-red order-btn load" 
						onClick={this.placeorder}>
					Preparing...
					<span className="loader">
							<Faspinner/>
					</span>
				</button>:
				null
			}
			{(this.props.user.orderstatus_fetching)?
				<button className="btn-red order-btn load" 
						onClick={this.placeorder}>
					Contacting chef...
					<span className="loader">
							<Faspinner/>
					</span>
				</button>:
				null
			}
			{Object.keys(this.props.cart.cart).map((key,i)=>{
				return(
						<div 	className="item" 
								key={i}>
							<div className="carti">
								<input 	type="number" 
										onChange={this.quantityUpdate} 
										data-key={key} 
										value={this.props.cart.cart[key].quantity} 
										min="1"/>
								<h4 className="generalDescription">
									{key}
								</h4>
								<h4 className="cost">
									₦{Math.round(this.props.cart.cart[key].totalCost*100)/100}
								</h4>
							</div>
							<a 	className="cancelBtn" 
								data-key={key} 
								onClick={this.deleteDiv}>
								x
							</a>
						</div>
					)	})
				}
				<div id='costing'>
					<div className="Totalbreakdown">
						<h4>Subtotal</h4>
						<h4 id="subtotal">{"₦"+this.props.cart.total}</h4>
					</div>
					<div className="Totalbreakdown">
						<h4>Delivery Fee</h4>
						<h4 id="delivery_charge">
							{"₦"+(this.props.chef.yourChef.delivery_charge||"0")}.00
						</h4>
					</div>
					<div className="Totalbreakdown">
						<h4>Tax</h4>
						<h4 id="tax">₦0.00</h4>
					</div>
					
					<div className="Totalbreakdown">
						<h2>Total</h2>
						<h2 id="total">
							{"₦"+(parseInt(this.props.chef.yourChef.delivery_charge||0,10)+parseInt(this.props.cart.total,10))+".00"}
						</h2>
					</div>
					<h6>Promo can only be applied after signing in</h6>
				</div>
				</div>
		)
}
}

export default connect(mapStateToProps)(checkoutSlip);