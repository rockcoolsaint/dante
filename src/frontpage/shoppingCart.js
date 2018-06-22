import React from 'react'
import '../style/shoppingCart.css'
import '../style/App.css'
import {Link} from 'react-router-dom'
import lib from '../util/lib'
import {connect} from 'react-redux'
import {mapStateToProps} from '../util/ajax'

const shoppingCart=(props)=>{
	 const deleteDiv=(e)=>{
		lib.deleteCart(e.target.dataset.key)
	}

	const quantityUpdate=(e)=>{
		lib.quantityUpdate(e.target.value,e.target.dataset.key)
	}
	return(
		(Object.keys(props.cart.cart).length)?
      <div className="ShoppingCartHolder">
        <h2>Order</h2>
				{Object.keys(props.cart.cart).map(
					(key,i)=>
						<div 	className="item"
								key={i}>
							<div className="carti">
								<input 	type="number"
										onChange={quantityUpdate}
										data-key={key}
										value={props.cart.cart[key].quantity}
										min="1"/>
								<h4 className="generalDescription">
									{key}
								</h4>
								<h4 className="cost">
									₦{Math.round(props.cart.cart[key].totalCost*100)/100}
								</h4>
							</div>
							<a 	className="cancelBtn"
								data-key={key}
								onClick={deleteDiv}>
								x
							</a>
              <hr/>
            </div>
					)
				}
				<div className="lastcost">
					<div className="Totalcost">
						<h4>
							Subtotal
						</h4>
						<h4 className="total-price">
							₦{props.cart.total}
						</h4>
					</div>
					<Link to="/checkout">
						<button className="btn btn-red btn-big" >
							checkout
						</button>
					</Link>
				</div>
			</div>:
			<div 	className="ShoppingCartHolder text-center"
					id="z">
				<h4>
					<em id="z">cart is empty</em>
				</h4>
			</div>
		)
}

export default connect(mapStateToProps)(shoppingCart)
