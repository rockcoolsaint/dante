import { Redirect } from "react-router-dom"
import React from 'react'
import {connect} from 'react-redux'
import Profile from './profile'
import {mapStateToProps} from '../util/ajax'

const authenticatedRoute =(props)=>{
		return((props.user.isAuthenticated)?
				 <Profile/>: 
				 <Redirect to='/'/>
				)
}

export default connect(mapStateToProps)(authenticatedRoute);
