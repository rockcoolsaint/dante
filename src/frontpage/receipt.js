import React, { Component } from 'react';
import TiSocialFacebook from 'react-icons/lib/ti/social-facebook';
import TiSocialTwitter from 'react-icons/lib/ti/social-twitter';
import FaStar from 'react-icons/lib/fa/star';
import TiSocialInstagram from 'react-icons/lib/ti/social-instagram';
import {connect} from 'react-redux';
import '../style/receipt.css';
import {delete_cart} from '../data_Container/action/actions';
import {Link} from 'react-router-dom';
import lib from '../util/lib'
import ajx,{mapStateToProps} from '../util/ajax'

class receipt extends Component{
    constructor(props){
        super(props)
        this.gettime=this.gettime.bind(this);
    }
    gettime(){
        return lib.timewillpass().current
    }
    componentDidMount(){
        this.props.dispatch(delete_cart())
    }
    componentWillUnmount(){
        //this.props.dispatch(clear_receipt())
    }
    render(){
        const receiptpath=this.props.page.restaurantPath
    return(
        <div id="a">
            <div id="b">
                <div id="c">
                    <h2>Thank you for shopping with us</h2>
                    <img src={ajx.normalizedlogo} alt="my-bukka"/>
                </div>
                <div id="d">
                    <img src={this.props.receipt.chefProfilepic} alt="chef"/>
                    <h4>How was your experience?</h4>
                    <span>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </span>
                </div>
            </div>
            <div id="e">
                <h1><span id="ea">₦</span>{parseInt(this.props.receipt.receipt.total,10)+parseInt(this.props.receipt.deliveryFee,10)+parseInt(this.props.receipt.tax,10)}.00</h1>
                <div id="f" >
                    {Object.keys(this.props.receipt.receipt.cart).map((item,key)=>
                        <h5 key={key}>
                            <span>{item}</span>
                            <span>₦{this.props.receipt.receipt.cart[item].totalCost}.00</span>
                        </h5>
                    )}
                </div>
                <div id="g">
                    <h5>
                    <span>Subtotal</span>
                    <span>₦{this.props.receipt.receipt.total}</span>
                    </h5>
                    <h5>
                    <span>Delivery Fee</span>
                    <span>₦{this.props.receipt.deliveryFee}.00</span>
                    </h5>
                    <h5>
                    <span>Tax</span>
                    <span>₦{this.props.receipt.tax}.00</span>
                    </h5>
                </div>
                <h5>
                <span>Total</span>
                <span>₦{
                    parseInt(
                        this.props.receipt.receipt.total,10
                    )+parseInt(
                        this.props.receipt.deliveryFee,10
                    )+parseInt(
                        this.props.receipt.tax,10
                    )
                    }.00</span>
                </h5>
            </div>

            <div id="h">
                <h6>Order history</h6>
                <h6>business@mybukka.com</h6>
                <h6>+234 708 756 4619</h6>
                {
                    (this.props.page.isRestaurant)?
                    <Link to={receiptpath} ><h5 id="hb" onClick={this.delete_Receipt}><span id="ha">CONTINUE SHOPPING</span></h5> </Link>:
                    <Link to="/"><h5 id="hb" onClick={this.delete_Receipt}><span id="ha">CONTINUE SHOPPING</span></h5> </Link>
                }
                
                <h1>
                    <span className="so" href="https://www.facebook.com/mybukka"><TiSocialFacebook/></span>
                    <span className="so" href="https://twitter.com/MyBukka"><TiSocialTwitter/></span>
                    <span className="so" href="https://www.instagram.com/mybukka/"><TiSocialInstagram/></span>
                </h1>
            </div>
            <h6 id="i"><span>Visa xxxx</span><span>{this.gettime()}</span></h6>
        </div>
    )
}
}

export default connect(mapStateToProps)(receipt)
