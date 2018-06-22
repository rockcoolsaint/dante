import React, { Component } from 'react';
import '../style/profile.css';
import lib from '../util/lib';
import Faspinner from 'react-icons/lib/fa/spinner'

export default class basicinformation extends Component{
	constructor(props){
		super(props)
		this.state={
			info:{
			first_name:props.user.user.first_name,
			last_name:props.user.user.last_name,
			mobile:props.user.user.mobile,
			email:props.user.user.email
			},
			password:{
					newPassword:'',
					oldPassword:'',
					error:''
			}
		}
		this.valchange=this.valchange.bind(this)
		this.passwordChange=this.passwordChange.bind(this)
		this.onHandleChangePassword=this.onHandleChangePassword.bind(this)

	}

	valchange(e,field){
		e.preventDefault();
		e.persist();
		(field==='first_name')?
		this.setState((prevState,props)=>({
			info:{
				...prevState.info,
			first_name:e.target.value
		}
		})):
		(field==='last_name')?
		this.setState((prevState,props)=>({
			info:{
				...prevState.info,
			last_name:e.target.value
			}
		})):
		(field==='mobile')?
		this.setState((prevState,props)=>({
			info:{
				...prevState.info,
			mobile:e.target.value
			}
		})):
		(field==='email')?
		this.setState((prevState,props)=>({
			info:{
				...prevState.info,
			email:e.target.value
			}
		})):
		null
	}
	passwordChange(e,field){
		e.persist();
		e.preventDefault();
		(field==='newPassword')?
		this.setState((prevState,props)=>({
			password:{
				...prevState.password,
				newPassword:e.target.value
			}})):
		(field==='oldPassword')?
		this.setState((prevState,props)=>({
			password:{
				...prevState.password,
				oldPassword:e.target.value
			}})):
		(field==='ConfirmNewPassword')?
		(this.state.password.newPassword===e.target.value)?
		this.setState((prevState,props)=>({
			password:{
				...prevState.password,
				error:''
			}})):
		this.setState((prevState,props)=>({
			password:{
				...prevState.password,
				error:`passwords do not match ${e.target.value}`
			}})):
		null
	}
	onHandleChangePassword(e){
		e.preventDefault()
		e.stopPropagation();

		let _={
			newPassword:this.state.password.newPassword,
			oldPassword:this.state.password.oldPassword
		}

		lib.alterPassword(e,_)
		.then((res)=>console.log(res))
		.catch((err)=>console.log(err))
	}

	render(){
		return(
			<div className="row m-content-holder">
				<div className="col-md-4 m-left">
					<h3>Basic Information</h3>
					<div className="l-profile-photo-holder">
						<img src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg" alt="" className="profile-photo"/>
						
					    <input type="file" accept="image/*" className="profile-photo-selector"/>
					</div>
				</div>
				<form className="col-md-8 input-holder m-right" autoComplete="on">
					<input 	placeholder="First Name" 
							type="text" 
							id="FirstName"
							value={this.state.info.first_name}
							onChange={(e)=>this.valchange(e,'first_name')}/>

					<input 	placeholder="Last Name" 
							type="text" 
							id="LastName" 
							value={this.state.info.last_name}
							onChange={(e)=>this.valchange(e,'last_name')}/>

					<input 	placeholder="Mobile Number" 
							type="tel" 
							id="MobileNumber"
							value={this.state.info.mobile}
							onChange={(e)=>this.valchange(e,'mobile')}/>

					<input 	placeholder="Email" 
							type="email" id="email"
							value={this.state.info.email}
							onChange={(e)=>this.valchange(e,'email')}/>

					{
						(this.props.user.edit_user.updating_user_info)?
						<button className='btn-red'>
								Updating..
								<span className="loader">
										<Faspinner/>
								</span>
						</button>:
						<button id="update-profile"
								className='btn-red' 
								onClick={(e)=>lib.edit_user(e,this.state.info)}>
								Update Profile
						</button>
					}

					<input  placeholder="Enter Current Password" 
							type="password" 
							id="oldPassword"
							value={this.state.password.oldPassword}
							onChange={(e)=>this.passwordChange(e,'oldPassword')}/>

					<input  placeholder="Enter New Password" 
							type="password" 
							id="newPassword"
							value={this.state.password.newPassword}
							onChange={(e)=>this.passwordChange(e,'newPassword')}/>

					<input  placeholder="Confirm Password" 
							type="password" 
							id="ConfirmPassword"
							//value={this.state.password.oldPassword}
							onChange={(e)=>this.passwordChange(e,'ConfirmNewPassword')}/>

					<button className="btn-red"
							type='button'
							onClick={(e)=>this.onHandleChangePassword(e)}>
							Change Password
					</button>
					
				</form>
			</div>
			)
	}
}