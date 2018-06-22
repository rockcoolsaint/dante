import { Redirect } from "react-router-dom"
import React,{Component} from 'react'
import {connect} from 'react-redux'
import ErrorChef from './Error'
import CuisinePage from '../frontpage/CuisinePage'
import {mapStateToProps} from '../util/ajax'
import lib from '../util/lib'

class CuisineRoute extends Component{

    componentWillMount(){
       if(!this.props.chef.fetching_chefAndCuisine){
        const cp=this.props.location.pathname,pp=this.props.page.prevpath
        if(cp===pp){
            lib.onRefresh()
        }
       } 
    }
    componentDidMount(){
        lib.previouspath(this.props.location.pathname)
    }

    render(){
        console.log(this.props)
        return(
        (this.props.chef.error)?
        <ErrorChef/>:
        (this.props.chef.fetching_chefAndCuisine)?
        <CuisinePage/>:
        (this.props.chef.fetched_chefAndCuisine)?
        (this.props.chef.fetched)?
        <Redirect to="/Cuisine/Menupage" />:
        <CuisinePage/>:
        <Redirect to="/"/>
        )
    }
}
export default connect(mapStateToProps)(CuisineRoute)