import React from 'react'
import lib from '../util/lib' 
import '../style/signIn.css'
import {connect} from 'react-redux'
import {mapStateToProps} from '../util/ajax'

const ForgotPassword=(props)=>{

var sendResetLink=(e)=>{
    e.preventDefault()
    var _et=document.getElementById('emailt').value
    if(_et!==null&&_et!==""){
    lib.forgotPassword(_et)
    }
}

    return(
        <div id="bigmenu">
            <div id="addmenu" className="vbo">
                <form className="formField ipp" autoComplete="on">
                    <div id="topPart">
						<a onClick={()=>lib.toggleshowforgotpassword()}>X</a>
					</div>
                    <label className="la">
                        Email
                    </label>
                    <input placeholder="yourname@email.com" id="emailt" name="email" autoComplete="on"/>
                    <button className="btn-red"
                            onClick={(e)=>sendResetLink(e)} >
                        Send reset link
                    </button>
                    {(props.user.forgot_password.error)?
                        (!props.user.forgot_password.error.response)?
                            <span className="ee vja">
                                {props.user.forgot_password.error.error.message}! Please check your network connection
                            </span>:
                            <span className="ee vja">
                                {props.user.forgot_password.error.error.msg}
                            </span>:
                            null
                    }
                </form>
            </div>
         </div>
)
}

export default connect (mapStateToProps) (ForgotPassword)