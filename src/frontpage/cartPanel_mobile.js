import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import lib from '../util/lib'
import {mapStateToProps} from '../util/ajax'

const Cart_Panel=(props)=>{
    return(
        (Object.keys(props.cart.cart).length)?
            <div className="ijk">
                <h6 className="fb">{"₦"+props.cart.total}</h6>
                <Link to="/checkout">
                    <h4 className="fa">CHECK OUT</h4>
                </Link>
                <h6 className="fb fc">{lib.amountofitems()}</h6>
            </div>:
            null
    )
}
export default connect (mapStateToProps) (Cart_Panel)