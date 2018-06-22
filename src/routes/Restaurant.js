import React, { Component } from 'react'
import '../style/App.css'
import '../style/index.css'
import { connect } from 'react-redux'
import { mapStateToProps } from '../util/ajax'
import lib from '../util/lib'
import ScrollLogic from '../frontpage/ScrollLogic'
import MenuPage from '../menu/menuPage'
import CartPanel from '../frontpage/cartPanel_mobile'
import OptionLeaf from '../frontpage/OptionLeaf'
import MenuItems from '../menu/menuItems'
import Footer from '../components/common/Footer'
import First from '../frontpage/FirstPagePreloader'

class Restaurant extends Component {
    componentWillMount() {
        const { match: { params } } = this.props
        lib.chefResult(params.uid)
        lib.isRestaurant(this.props.location.pathname)
    }
    componentDidMount() {
        lib.previouspath(this.props.location.pathname)
        console.log(this.prop)
    }

    render() {
        return (
            <div className="dev">
                <ScrollLogic isrestaurant={true}
                    chef_fetched={this.props.chef.fetched_chefsInYourArea}
                    Located={true} />
                <MenuPage chef={this.props.chef}
                    isrestaurant={true} />
                <CartPanel />
                <MenuItems chef={this.props.chef} />
                <Footer />
                <OptionLeaf />
                {(!this.props.chef.fetched_chefsInYourArea) ?
                    <First /> :
                    null
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Restaurant)
