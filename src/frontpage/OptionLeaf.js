import React from 'react'
import { connect } from 'react-redux'
import DifChefsError from '../frontpage/DifChefsError'
import ForgotPassword from '../frontpage/ForgotPassword'
import SignIn from '../authentication/signIn'
import SignUp from '../authentication/SignUp'
import Addmenu from '../frontpage/addmenu'
import AddCard from '../checkout/addCard'
import {mapStateToProps} from '../util/ajax'

const OptionLeaf=(props)=>(
    (props.page.showsignIn)? 
    <SignIn user={props.user}/>:
    (props.page.showsignUp)? 
    <SignUp SignUp={props.SignUp}
            user={props.user}/>:
    (props.page.showforgotpasswordpage)?
    <ForgotPassword/>:
    (props.page.showaddmenu)?
    <Addmenu/>:
    (props.page.showdifcheferror)?
    <DifChefsError/>:
    (props.page.showaddCard)? 
    <AddCard 	user={props.user}/>:
    null			
)

export default connect(mapStateToProps)(OptionLeaf)