import React, { Component } from 'react';
import propTypes from 'prop-types'

import '../style/signIn.css'
import Faspinner from 'react-icons/lib/fa/spinner'
import lib from '../util/lib'
import closeButton from '../assets/images/close-button.svg'

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			f: null,
			l: null,
			m: null,
			e: null,
			p: null,
			c: null
		}
		this.type = this.type.bind(this)
	}

	signup() {
		if (document.getElementById("Passwordi").value !== document.getElementById("ConfirmPasswordi").value) {
			alert("password is not the same as confirm password!")
		}
		else {
			var email = document.getElementById("emaili").value,
				firstname = document.getElementById("FirstNamei").value,
				lastname = document.getElementById("LastNamei").value,
				password = document.getElementById("Passwordi").value,
				mobile = document.getElementById("MobileNumberi").value,
				isCustomer = true
			lib.signup(email, firstname, lastname, password, mobile, isCustomer)
		}
	}

	type(e) {
		var email = document.getElementById("emaili").value,
			firstname = document.getElementById("FirstNamei").value,
			lastname = document.getElementById("LastNamei").value,
			password = document.getElementById("Passwordi").value,
			confirm = document.getElementById("ConfirmPasswordi").value,
			mobile = document.getElementById("MobileNumberi").value

		if (e.currentTarget.id === "emaili")
			this.setState({ e: email })
		else if (e.currentTarget.id === "FirstNamei")
			this.setState({ f: firstname })
		else if (e.currentTarget.id === "LastNamei")
			this.setState({ l: lastname })
		else if (e.currentTarget.id === "Passwordi")
			this.setState({ p: password })
		else if (e.currentTarget.id === "ConfirmPasswordi")
			this.setState({ c: confirm })
		else if (e.currentTarget.id === "MobileNumberi")
			this.setState({ m: mobile })
	}
	render() {
		return (
			<div className="signInPopup">
				<div className="overlay" onClick={() => lib.toggleSignUp()}></div>
				<div className="SignUpPopupHolder">
					<div className="signup-modal">
						<div id="topPart">
							<p>Sign Up</p>
							<a onClick={() => lib.toggleSignUp()}>
								<img src={closeButton} alt="close-button" />
							</a>
						</div>
						<form className="formField" autoComplete="on">
							<input placeholder="First Name"
								type="text"
								id="FirstNamei"
								name="first-name"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.f === "") ?
									<span className="ef">Firstname field cannot be empty</span> :
									null
							}
							<input placeholder="Last Name"
								type="text"
								id="LastNamei"
								name="last-name"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.l === "") ?
									<span className="ef">Lastname field cannot be empty</span> :
									null
							}
							<input placeholder="Mobile Number"
								type="tel"
								id="MobileNumberi"
								name="tel"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.m === "") ?
									<span className="ef">Mobile number field cannot be empty</span> :
									null
							}
							<input placeholder="name@example.com"
								type="email"
								id="emaili"
								name="email"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.e === "") ?
									<span className="ef">Email field cannot be empty</span> :
									null
							}
							<input placeholder="Password"
								type="password"
								id="Passwordi"
								name="new-password"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.p === "") ?
									<span className="ef">Password field cannot be empty</span> :
									null
							}
							<input placeholder="Confirm Password"
								type="password"
								id="ConfirmPasswordi"
								name="new-password"
								onChange={this.type}
								autoComplete="on" />
							{
								(this.state.c === "") ?
									<span className="ef">confirm Password field cannot be empty</span> :
									(this.state.p !== this.state.c && this.state.p !== "" && this.state.p !== null) ?
										<span className="ef">Password and Confirm Password field must be the same</span> :
										null
							}
							{(!this.props.SignUp.fetching && !this.props.user.fetching) ?
								<button className="btn-red"
									onClick={this.signup}>
									Sign Up
							</button> :
								null
							}
							{(this.props.SignUp.fetching) ?
								<button className="btn-red load">
									Creating account...
								<span className="loader">
										<Faspinner />
									</span>
								</button> :
								null
							}
							{(this.props.user.fetching) ?
								<button className="btn-red load">
									Signing in
								<span className="loader">
										<Faspinner />
									</span>
								</button> :
								null
							}
						</form>
					</div>
					<hr />
					<div className="new-user">
						<p>
							Already a User <br />
							<a id="sign-btn"
								onClick={lib.toggleSignin_noscroll}>
								Sign In
								</a>
						</p>
					</div>
					{(this.props.SignUp.error) ?
						(!this.props.SignUp.error.response) ?
							<span className="ee">
								{this.props.SignUp.error.message}! Please try again
						</span> :
							<span className="ee">
								{this.props.SignUp.error.response.data.msg}! Please try again
						</span> :
						null
					}
				</div>
			</div>
		)
	}
}

export default SignUp
SignUp.propTypes = {
	user: propTypes.object.isRequired,
	SignUp: propTypes.object.isRequired,
}
