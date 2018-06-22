import React, { Component } from 'react'
import lib from '../util/lib' 
import '../style/signIn.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapStateToProps} from '../util/ajax'
import Faspinner from 'react-icons/lib/fa/spinner'

class ChangePassword extends Component{
constructor(props){
    super(props)
    this.state={
        error:null,
        passwordChanged:false,
        res:null,
        fetching:false
    }
    this.changePassword=this.changePassword.bind(this)
}
ek(e){
    e.preventDefault()
    e.stopPropagation() 
}
changePassword(e){
    e.preventDefault()
    e.stopPropagation()
    e.persist()
    let pa=document.getElementById('pa').value,
        pb=document.getElementById('pb').value,
        _=this
    
    if(pa===""||pb===""){
        _.setState((prevState,props)=>({
            error:{error:{message:"Password field cannot be empty!"}}
        }))
    }else if(pa!==pb){
        _.setState((prevState,props)=>({
            error:{error:{message:"Passwords do not match!"}}
        }))
    }else{
        const { match:{params} }=this.props,
        code=params.key,
        password=pa

        this.setState(()=>({
            fetching:true
            }))

        lib.changePassword(password,code)
        .then((res)=>this.setState(()=>({
            passwordChanged:true,
            error:null,
            res,
            fetching:false
            })))
        .catch((e)=>(
            this.setState(()=>
            ({
                error:e,
                fetching:false
            })))
        )     
    }
   
}

render(){
    return(
        <div id="bigmenu">
            <div id="addmenu" className="vbo">
                <form className="formField ipp" autoComplete="on">
                    <input placeholder="Enter New Password" id="pa" type="password" name="password" autoComplete="on"/>
                    <input placeholder="Confirm New Password" id="pb" type="password" name="password" autoComplete="on"/>
                    {   (!this.state.passwordChanged)?
                        (this.state.fetching)?
                        <button className="btn-red order-btn load" 
                                onClick={this.ek}>
                            Saving changes...
                            <span className="loader">
                                    <Faspinner/>
                            </span>
                        </button>:
                        <button className="btn-red"
                                onClick={this.changePassword} >
                            Reset Password
                        </button>:
                        <Link to="/">
                            <button className="btn-red">
                                Continue Shopping 
                            </button>
                        </Link>
                    }
                    {(this.state.error)?
                            (this.state.error.response)?
                            <span className="ee vja">
                                {this.state.error.error.msg}
                            </span>:
                            <span className="ee vja">
                                {this.state.error.error.message}
                            </span>:
                            null
                    }
                    {   (this.state.passwordChanged)?
                        <span className="ee vja">
                        {this.state.res.msg}
                        </span>:
                        null
                    }
                </form>
            </div>
         </div>
)
}
}

export default connect (mapStateToProps) (ChangePassword)