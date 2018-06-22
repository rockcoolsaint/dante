import React from 'react'
import '../style/App.css'
import Footer from '../components/common/Footer'
import ScrollLogic from '../frontpage/ScrollLogic'
import MenuPage from '../menu/menuPage'
import MenuItems from '../menu/menuItems'
import { connect } from 'react-redux'
import CartPanel from '../frontpage/cartPanel_mobile'
import OptionLeaf from '../frontpage/OptionLeaf'
import { mapStateToProps } from '../util/ajax'


const MenuPageHolder = (props) => (
	<div className="devi">
		<ScrollLogic chef_fetched={props.chef.fetched_chefsInYourArea}
			Located={props.address.Located} />
		<MenuPage chef={props.chef} />
		<CartPanel />
    <MenuItems chef={props.chef} />
    <div className="menuFooter">
      <Footer />
    </div>
		<OptionLeaf />
	</div>
)

export default connect(mapStateToProps)(MenuPageHolder)
