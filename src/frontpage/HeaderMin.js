import React, { Component } from 'react'
import '../style/App.css'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'
import SimpleForm from './autoComplete'
import ShoppingCart from './shoppingCart'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import lib from '../util/lib'
import ajx, { mapStateToProps } from '../util/ajax'


class HeaderMin extends Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
	}

	componentDidMount() {
		lib.cki('l')
	}
	componentWillReceiveProps(nextProps) {
		(nextProps !== this.props) ?
			(this.props = nextProps,
				setTimeout(() => lib.addClass('l'), 50)) :
			null
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrolld);
	}

	isLoading = (loading) => {
		this.setState({ loading })
	}
	render() {
		const receiptpath = this.props.page.restaurantPath
		return (
			<div id="head" className="myheader header-min header-small ab">
				{(this.props.page.isRestaurant) ?
					<Link to={receiptpath}>
						<img src={ajx.logo}
							id="logo-min"
							alt="logo"
							className="zzq" />
					</Link> :
					<Link className="Mybukkalogo"
						to="/">
						<img src={ajx.logo}
							id="logo-min"
							alt="logo" />
					</Link>
				}
				{(this.props.page.isRestaurant) ?
					null :
					<div className="search-box search-box-min search-loc">
						<SimpleForm
							chefResult={this.props.chefResult}
							isLoading={this.isLoading}
						/>
					</div>
				}
				{(!this.props.user.isAuthenticated) ?
					<div className=" header-top-button header-top-button-min small-head ">
						<button onClick={() => lib.toggleSignin()}
							className="display-toggle min-sign-in">
							Sign In
						</button>
						<button className="btn-red display-toggle min-sign-up"
							onClick={() => lib.toggleSignUp()}>
							Sign Up
						</button>
						{(this.props.chef.fetched) ?
							<div>
								<div>
									<span className="s-cart">
										{(Object.keys(this.props.cart.cart).length) ?
											lib.amountofitems() :
											null
										}
									</span>
								</div>
								<div className='m-cart-not-signed-in display-toggle em' id="l">
									<MdShoppingCart className="shopping-cart display-toggle" />
									<div className="m-cart-items">
										<ShoppingCart />
									</div>
								</div>
							</div> :
							null
						}
					</div> :
					<div className=" m-info small-head">
						<div className="m-profile-photo-holder hh">
							<div className="m-user-icon-holder display-toggle">
								<img src={this.props.user.user.profile_photo}
									alt=" "
									className="m-profile-photo" />
							</div>
							<div className="m-profile-options display-toggle">
								<Link to="/profile"
									className="lin m-options" >
									Account
								</Link>
								<a className="m-options"
									onClick={lib.signout}>
									Log Out
								</a>
							</div>
						</div>
						{(this.props.chef.fetched) ?
							<div>
								<div>
									<span className="s-cart lf">
										{(Object.keys(this.props.cart.cart).length) ?
											lib.amountofitems() :
											null
										}
									</span>
								</div>
								<div className='m-cart-not-signed-in display-toggle em lk' id="l">
									<MdShoppingCart className="shopping-cart display-toggle" />
									<div className="m-cart-items">
										<ShoppingCart />
									</div>
								</div>
							</div> :
							null
						}
					</div>
				}
			</div>
		)
	}
}

export default connect(mapStateToProps)(HeaderMin)
