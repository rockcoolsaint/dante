import React, { Component } from 'react'
import '../style/App.css'
import '../style/headerStories.css'
import MdShoppingCart from 'react-icons/lib/md/shopping-basket'
import SimpleForm from './autoComplete'
import ShoppingCart from './shoppingCart'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import lib from '../util/lib'
import ajx,{mapStateToProps} from '../util/ajax'

class headerStories extends Component{
	constructor(Props){
		super(Props)
		this.state={
			more:this.props.chef.menuCategoriesKeys
		}
	}
	componentDidMount(){
		lib.cki('k')
	}
	componentWillReceiveProps(nextProps){
		(nextProps!==this.props)?
		(this.props=nextProps,
		setTimeout(()=>lib.addClass('k'),50)):
		null
	}

	render(){
		const receiptpath=this.props.page.restaurantPath
		return(
				<div id="head" className="myheader header-min bigMenuHolder ab">
				{(this.props.page.isRestaurant)?
					<Link to={receiptpath}>
					<img 	src={ajx.logo} 
							id="logo" 
							alt="logo"/>
					</Link>:
					<Link to="/">
						<img 	src={ajx.logo} 
								id="logo" 
								alt="logo"/>
					</Link>
				}
					{(this.props.page.isRestaurant)?
						null:
						<div className="search-box search-box-min search">
							<SimpleForm chefResult={this.props.chefResult}/>
						</div>
					}
					{(!this.props.user.isAuthenticated)? 
						<div className="header-top-button header-top-button-min small-head head-option">
							<button 	className="stories-sign-in " 
										onClick={()=>lib.toggleSignin()}>
								Sign In
							</button>
							<button className="btn-red stories-sign-up" 
									onClick={()=>lib.toggleSignUp()} >
								Sign Up
							</button>
							<div>
								<span className="s-cart">
									{(Object.keys(this.props.cart.cart).length)? 
										lib.amountofitems():
												null
									}	
								</span> 
							</div>
							<div className='m-cart-not-signed-in em' id="k">
								<span>
									<MdShoppingCart className="shopping-cart" id="sc"/>
								</span>
								<div className="m-cart-items">
									<ShoppingCart  />
								</div>
							</div>
						</div>:
						<div className="m-info">
							<div className="m-profile-photo-holder hh">
								<div className="m-user-icon-holder">
									<img 	src={this.props.user.user.profile_photo} 
											alt="" 
											className="m-profile-photo"/>
								</div>
								<div className="m-profile-options">
									<Link 	to="/profile" 
											className="lin m-options">
										Account
									</Link>
									<a 	className="m-options" 
										onClick={lib.signout}>
										Log Out
									</a>
								</div>
							</div>											
							{(this.props.chef.fetched)?
								<div>
									<div>
										<span className="s-cart lf">
											{(Object.keys(this.props.cart.cart).length)? 
												lib.amountofitems():
														null
											}	
										</span>
									</div>
									<div className='m-cart-not-signed-in display-toggle em lk' id="k">
										<MdShoppingCart className="shopping-cart display-toggle"/>
										<div className="m-cart-items">
											<ShoppingCart  />
										</div>
									</div>
								</div>: 
								null
							}
						</div>
					}
					<div className="divider"></div>
					<ul className="menuHolder">
						{(this.props.chef.fetched)? 
							this.state.more.map(
								(categ,key)=> 
									(key<9)? 
									<li key={key}>
										<a 		href={'#'+categ} 
												className={"m-categories "+categ} 
												data-categ={categ} 
												onClick={lib.changecol}>
										{categ}
										</a>
									</li>:
									null ):
									null
						}
						{(this.state.more.length>=9)?
							<li id="more" 
								className="r">
								<a 	id="il" 
									onClick={lib.show}>
									More...
								</a>
								{(this.props.chef.fetched_chefsInYourArea)? 
									<div id='mt' className="moreitems d zp">
										{this.state.more.map(
											(categ,key)=> 
												(key>=9)?
													<a 		key={key}
															href={'#'+categ} 
															className={"m-categories "+categ} 
															data-categ={categ} 
															onClick={lib.changecol}>
														{categ}
													</a>:
													null )
										}
									</div>:
									null
								}
							</li>:
							null
							}
					</ul>
				</div>
			)
		}
	}

export default connect(mapStateToProps)(headerStories)