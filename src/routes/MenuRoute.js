import { Redirect } from "react-router-dom"
import React,{Component} from 'react'
import {connect} from 'react-redux'
import ErrorChef from './Error'
import MenuPage from '../frontpage/MenuPage'
import {mapStateToProps} from '../util/ajax'
import lib from '../util/lib'


class MenuRoute extends Component{

    componentWillMount(){
        const cp=this.props.location.pathname,pp=this.props.page.prevpath
        if(cp===pp){
           // lib.onRefresh()
        }
    }
    componentDidMount(){
		lib.previouspath(this.props.location.pathname)
	}

render(){
    return(
    (this.props.chef.error)?
    <ErrorChef/>:
    (this.props.chef.fetched)?
    (this.props.page.isRestaurant)?
    <Redirect to={this.props.page.restaurantPath}/>:
    <MenuPage/>:
    <Redirect to="/Cuisine"/>
)
    }
}

export default connect(mapStateToProps)(MenuRoute)