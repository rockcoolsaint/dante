import React, { Component } from 'react';
import '../style/profile.css';

export default class notification extends Component{

	render(){
		return(
			<div className="row m-row-width">
				<div className="col-md-4">
				    <h4>Notification Settings</h4>
				</div>
				<div className="col-md-8 m-content-holder">
					<h4>Email Preferences</h4>
					<h5 className="m-equalwidth">Subcribe to email Notifications</h5>
					<div className="m-equal">
						<button>Yes Please</button>
						<button>No thanks</button>
					</div>
					<h6>We'll only send you legal or administrative emails, and any emails you’ve specifically subscribed to.</h6>
				</div>
			</div>
			)
	}
}