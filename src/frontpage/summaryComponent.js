import React, { Component } from 'react';
import '../style/summaryComponent.css';



export default class summaryComponent extends Component {
	render() {
		return (
			<div className="summary-holder">
				<div className="row">
					<h1 className="summary-text"><b>HOW TO USE</b></h1>
					<br />
					<br />

					<div className="col-sm-4">
						<img className="image4 img-responsive" src="https://res.cloudinary.com/bukka/image/upload/v1500737722/app/location.png" alt="image4" />
						<br />
						<h2 className="s-text"><b>SET DELIVERY ADDRESS</b></h2>
						<br />
						<p className="summary-p">Type in your delivery address in the input box above to find the food that matches your taste in that area.</p>
					</div>
					<div className="col-sm-4">
						<img className="image4 img-responsive" src="https://res.cloudinary.com/bukka/image/upload/v1500737722/app/register.png" alt="image5" />
						<br />
						<h2 className="s-text"><b>PLACE YOUR ORDER</b></h2>
						<br />
						<p className="summary-p">Add what you would like to eat into cart, register, make payments and checkout. Your food is on a way.</p>
					</div>
					<div className="col-sm-4">
						<img className="image4 img-responsive" src="https://res.cloudinary.com/bukka/image/upload/v1500737722/app/meal.png" alt="image6" />
						<br />
						<h2 className="s-text"><b>ENJOY YOUR MEAL</b></h2>
						<br />
						<p className="summary-p">Seat back, your food would be delivered to you sooner than expected then come back for more.</p>
					</div>

				</div>
			</div>
		)
	}
}
