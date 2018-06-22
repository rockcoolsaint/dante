import React from 'react'
import '../style/addmenu.css'
import '../style/App.css'
import {connect} from 'react-redux'
import lib from '../util/lib'
import {mapStateToProps} from '../util/ajax' 
import {Link} from 'react-router-dom'

const DifChefsError=(props)=>{
    let pp;
    if(Object.keys(props.cart.cart).length){
    pp="/restaurant/"+props.cart.cart[`${Object.keys(props.cart.cart)[0]}`].chef
    console.log(pp)
    }
    
    
    return (
    <div id="bigmenu">
        <div id="addmenu" className="vbo"> 
            <div id="err">
                <h4>Sorry! You can only shop from one chef at a time.You may {" "}
                    <a  className="clear_c" 
                        onClick={()=>lib.clear_Cart()}>
                         clear Cart
                    </a> 
                    {" "}
                        to proceed with a new chef or
                    {" "}
                    <Link to={pp} className="clear_c" onClick={()=>lib.toggleShowdifcheferror()}>
                        Continue Shopping
                    </Link>
                </h4>
                    
            </div>
        </div>
    </div>
)
}
export default connect (mapStateToProps) (DifChefsError)