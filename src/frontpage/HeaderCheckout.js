import React,{Component} from 'react'
import '../style/App.css';
import SimpleForm from './autoComplete'
import {Link} from 'react-router-dom'
import lib from '../util/lib'
import {connect} from 'react-redux'
import ajx,{mapStateToProps} from '../util/ajax'
 
 
class HeaderCheckout extends Component{
componentDidMount(){
	if(this.props.chef.error!==null){
		lib.logocheckout()
	}
}

	render(){
		const receiptpath=this.props.page.restaurantPath
		return(
			<div id="head"  className="myheader header-min bc">
			{(this.props.page.isRestaurant)?
				<Link to={receiptpath}>
				<img 	src={ajx.logo} 
						id="logo-min" 
						alt="logo"
						className="zzq"/>
				</Link>:
				<Link to="/">
					<img 	src={ajx.logo} 
							id="logo-min" 
							alt="logo"
							className="zzq"/>
				</Link>
				
			}
				<div className="search-box search-box-min search-loc">
					{(this.props.chef.error!==null)? 
						<SimpleForm />:
						null
					}
				</div>
				{(!this.props.user.isAuthenticated)? 
					null:
					<div className=" m-info small-head">
						<div className="m-profile-photo-holder hh">
							<div className="m-user-icon-holder display-toggle">
								<img 	src={this.props.user.user.profile_photo} 
										alt="" 
										className="m-profile-photo"/>
							</div>
							<div className="m-profile-options display-toggle">
								<Link 	to="/profile" 
										className="lin m-options" >
									Account
								</Link>
								<a 	className="m-options" 
									onClick={lib.signout}>
									Log Out
								</a>
							</div>
						</div>
					</div>
				}
			</div>
			)
	}
}
	
export default connect(mapStateToProps)(HeaderCheckout)