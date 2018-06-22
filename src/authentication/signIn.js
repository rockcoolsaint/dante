import React, { Component } from 'react'
import propTypes from 'prop-types'

import '../style/signIn.css'
import Faspinner from 'react-icons/lib/fa/spinner'
import lib from '../util/lib'
import closeButton from '../assets/images/close-button.svg'

export default class signIn extends Component {
	constructor(props) {
		super(props);
		this.getUser = this.getUser.bind(this);
		this.typing = this.typing.bind(this)
		this.state = {
			u: null,
			p: null,
		}
	}

	getUser() {
		var email = document.getElementById("SignInemail").value,
			password = document.getElementById("SignInPassword").value
		lib.signin(email, password)
	}
	typing(e) {
		var _f = document.getElementById("SignInemail").value,
			_p = document.getElementById("SignInPassword").value

		if (e.currentTarget.id === "SignInemail")
			this.setState({ u: _f })
		else if (e.currentTarget.id === "SignInPassword")
			this.setState({ p: _p })

	}

	render() {
		return (
			<div className="signInPopup">
				<div className="overlay" onClick={() => lib.toggleSignin()}></div>
				<div className="popupHolder">
					<div className="signin-modal">
						<div id="topPart">
							<p>Login</p>
							<div className="text">Type your email and password</div>
							<a onClick={() => lib.toggleSignin()}>
								<img src={closeButton} alt="close-button" />
							</a>
						</div>
						<form className="formField" autoComplete="on">
							<input placeholder="Email address"
								id="SignInemail"
								name="email"
								onChange={this.typing}
								autoComplete="on" />
							{
								(this.state.u === "") ?
									<span className="ef">email field cannot be empty</span> :
									null
							}
							<input placeholder="Password"
								type="password"
								id="SignInPassword"
								name="current-password"
								onChange={this.typing}
								autoComplete="on" />
							{
								(this.state.p === "") ?
									<span className="ef sp">password field cannot be empty</span> :
									null
							}
							<a onClick={() => lib.forgotPasswordfromSignin()}>Forgot Password?</a>
							{(!this.props.user.fetching && !this.props.user.fetched) ?
								<button className="btn-red"
									onClick={this.getUser}>
									Sign In
								</button> :
								null
							}
							{(this.props.user.fetching) ?
								<button className="btn-red load"
									onClick={this.getUser}>
									Signing in..
									<span className="loader">
										<Faspinner />
									</span>
								</button> :
								null
							}
							{(this.props.user.fetching_lastCardDigits) ?
								<button className="btn-red load"
									onClick={this.getUser}>
									Updating Your Info..
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
							New to Bukka? <br />
							<a id="sign-btn"
								onClick={lib.toggleSignUp_noscroll}>
								Sign Up
							</a>
						</p>
					</div>
					{(this.props.user.error) ?
						(!this.props.user.error.response) ?
							<span className="ee">
								{this.props.user.error.message}! Please try again
							</span> :
							<span className="ee">
								{this.props.user.error.response.data.msg}! Please try again
							</span> :
						null
					}
				</div>
			</div>
		)
	}
}

signIn.propTypes = {
	user: propTypes.object.isRequired
}
