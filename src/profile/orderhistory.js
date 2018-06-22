import React, { Component } from 'react';
import '../style/profile.css';
import lib from '../util/lib'

export default class orderhistory extends Component{
	constructor(props) {
		super(props);
		lib.orderhistory();
	}

	render(){
		return(
			<div className="m-history-holder">
				<h5>Your Order History</h5>
				<div className="m-header-info">
				<button>PAY FOR ALL UNPAID MEALS</button>
				</div>
				<table className="m-table-style">
					<thead>
						<tr>
							<th>S/N</th>
							<th>FOOD ITEMS</th>
							<th>QTY</th>
							<th>PRICE</th>
							<th>PAYMENT STATUS</th>
							<th>DATE</th>
						</tr>
					</thead>
					<tbody>
					{(this.props.user.fetched_orderhistory)? this.props.user.orderhistory.map(
						(meal,key)=>{return(
							<tr key={key}>
								<td>{key+1}</td>
								<td>{meal.itemName}</td>
								<td>{meal.itemQuantity}</td>
								<td>{meal.amount}</td>
								<td>{meal.paymentStatus}</td>
								<td>{meal.date}</td>
							</tr>)		}): 
						null
					}
					</tbody>
				</table>
			</div>
			)
	}
}