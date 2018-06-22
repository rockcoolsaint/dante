import React, { Component } from "react";
import "../style/addmenu.css";
import "../style/App.css";
import MdRemove from "react-icons/lib/md/remove";
import Mdadd from "react-icons/lib/md/add";
import { connect } from "react-redux";
import lib from "../util/lib";
import { mapStateToProps } from "../util/ajax";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import googl from "node-googl";

class addmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carti: this.props.cart.cart,
      cart: {},
      total: 0,
      unitcost: parseInt(this.props.menuinview.menuinview.price, 10),
      defaultQuantity: 1,
      itemTotal: parseInt(this.props.menuinview.menuinview.price, 10),
      chefinstruction: "",
      _shortUrl: null,
      _shortUrlfetched: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.increaseNumberOfItem = this.increaseNumberOfItem.bind(this);
    this.reduceNumberOfItem = this.reduceNumberOfItem.bind(this);
    this.addchefinstructions = this.addchefinstructions.bind(this);
    this.shortURL = this.shortURL.bind(this);
  }
  //shorten yourchef link
  shortURL() {
    /* googl.setKey('AIzaSyC7pSI7-ZNYURV92F7WqZamiYobmijSpyQ')


     googl.getKey();
      console.log("fetching")

     googl.shorten('chef.mybukka.com')
         .then(function (shortUrl) {
             console.log("Done!",shortUrl);
         })
         .catch(function (err) {
             console.error("ERROR OOO!",err.message);
         });*/
    let url =
      "http://mybukka.com/restaurant/" +
      this.props.menuinview.menuinview.chefuid;

    this.setState(() => ({
      _shortUrl: null,
      _shortUrlfetched: false
    }));

    googl.shorten(
      url,
      "AIzaSyC7pSI7-ZNYURV92F7WqZamiYobmijSpyQ",
      (err, shortenedUrl) => {
        if (err) {
          throw err;
        }

        this.setState(() => ({
          _shortUrl: shortenedUrl,
          _shortUrlfetched: true
        }));
      }
    );
  }

  //add chef instruction
  async addchefinstructions(e) {
    e.stopPropagation();
    e.preventDefault();
    await this.setState({ chefinstruction: e.currentTarget.value });
  }
  //increase number of items
  async increaseNumberOfItem(e) {
    e.stopPropagation();
    e.preventDefault();
    await this.setState({ defaultQuantity: this.state.defaultQuantity + 1 });
    await this.setState({
      itemTotal: this.state.defaultQuantity * this.state.unitcost
    });
  }
  //reduce number of items
  async reduceNumberOfItem() {
    this.state.defaultQuantity > 1
      ? await this.setState({ defaultQuantity: this.state.defaultQuantity - 1 })
      : null;
    await this.setState({
      itemTotal: this.state.defaultQuantity * this.state.unitcost
    });
  }
  //additem to cart
  async addToCart(e) {
    e.stopPropagation();
    e.preventDefault();
    if (Object.keys(this.props.cart.cart).length) {
      var _ = Object.keys(this.props.cart.cart)[0];
      if (this.props.chef.yourChef.uid !== this.props.cart.cart[`${_}`].chef) {
        lib.addmenu();
        lib.toggleShowdifcheferror();
        return {};
      }
    }
    var name = this.props.menuinview.menuinview.menu,
      desc = this.props.menuinview.menuinview.desc,
      price = this.state.unitcost,
      quantity = this.state.defaultQuantity,
      totalCost = this.state.itemTotal,
      hour = this.props.menuinview.menuinview.hour,
      min = this.props.menuinview.menuinview.min,
      chef = this.props.chef.yourChef.uid,
      chefinstruction = this.state.chefinstruction;
    if (this.state.carti.hasOwnProperty(name)) {
      var newQuantity = this.state.carti[name].quantity + quantity,
        newTotalcost = price * newQuantity,
        cartUpdate = {};
      cartUpdate[name] = {
        price: price,
        quantity: newQuantity,
        totalCost: newTotalcost,
        chefinstruction: chefinstruction,
        desc: desc,
        hour: hour,
        min: min,
        chef: chef
      };
      await this.setState({
        cart: {
          ...this.state.carti,
          ...cartUpdate
        }
      });
      let total = Object.keys(this.state.cart)
        .map((key, i) => this.state.cart[key].totalCost)
        .reduce((sum, value) => sum + value, 0.00)
        .toFixed(2);
      await this.setState({ total: total });
      lib.updateCart({ cart: this.state.cart, total: this.state.total });
    }

    if (!this.state.carti.hasOwnProperty(name)) {
      var newCart = {};
      newCart[name] = {
        price: price,
        quantity: quantity,
        totalCost: totalCost,
        chefinstruction: chefinstruction,
        desc: desc,
        hour: hour,
        min: min,
        chef: chef
      };
      await this.setState({
        cart: {
          ...this.state.carti,
          ...newCart
        }
      });
      let total = await Object.keys(this.state.cart)
        .map((key, i) => this.state.cart[key].totalCost)
        .reduce((sum, value) => sum + value, 0)
        .toFixed(2);
      await this.setState({ total: total });
      lib.updateCart({ cart: this.state.cart, total: this.state.total });
    }
    lib.addmenu();
  }

  componentDidMount() {
    this.shortURL();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
    }
  }
  render() {
    const mystyle = {
      backgroundImage: `url(${this.props.menuinview.menuinview.image})`
    };
    return (
      <div id="bigmenu">
        <div id="addmenu">
          <div id="addmenu-holder">
            <div className="addmenu-content">
              <div className="foodie" style={mystyle} />
              <a className="cancle-x" onClick={() => lib.addmenu()}>×</a>
              <div id="title">
                <h2>
                  {this.props.menuinview.menuinview.menu}
                </h2>
                <h5>
                  {this.props.menuinview.menuinview.desc}
                </h5>
                <h5 className="time">
                  Expected time of delivery is
                  {" "}
                  {this.props.menuinview.menuinview.hour}
                  {" "}
                  hour
                  {" "}
                  {this.props.menuinview.menuinview.min}
                  {" "}
                  mins
                </h5>
                {this.state._shortUrlfetched
                  ? <div className="share">
                      <FacebookShareButton
                        url={this.state._shortUrl}
                        quote={
                          "You can find " +
                            this.props.menuinview.menuinview.menu +
                            " and many more meals on the the link below"
                        }
                        className="fb"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={this.state._shortUrl}
                        title={
                          "You can find " +
                            this.props.menuinview.menuinview.menu +
                            " and many more meals on the the link below"
                        }
                        className="twt"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </div>
                  : null}
              </div>
              <div className="list-of-items">
                <div className="size-group">
                  <div className="size-container">
                    <span className="item-type">
                      WHAT SIZE WOULD YOU LIKE?
                    </span>
                    <span className="item-required">
                      REQUIRED
                    </span>
                  </div>
                  <ul className="item-collection">
                    <li className="list-item">
                      <input type="radio" className="input-size" name="size" />
                      <label for="Large">Large</label>
                      <span className="check-price">
                        ₦200
                      </span>
                    </li>
                    <li className="list-item">
                      <input type="radio" className="input-size" name="size" />
                      <label for="Large">Small</label>
                      <span className="check-price">
                        ₦100
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="size-group">
                  <div className="size-container">
                    <span className="item-type">
                      WHAT WOULD YOU LIKE TO ADD?
                    </span>
                  </div>
                  <ul className="item-collection">
                    <li className="list-item">
                      <input
                        id=""
                        type="checkbox"
                        className="input-check-size"
                        value=""
                      />
                      <label for="Large">Mango Jelly</label>
                      <span className="check-price">
                        + ₦100
                      </span>
                    </li>
                    <li className="list-item">
                      <input
                        id=""
                        type="checkbox"
                        className="input-check-size"
                        value=""
                      />
                      <label for="Large">Coke</label>
                      <span className="check-price">
                        + ₦100
                      </span>
                    </li>
                    <li className="list-item">
                      <input
                        id=""
                        type="checkbox"
                        className="input-check-size"
                        value=""
                      />
                      <label for="Large">Beer</label>
                      <span className="check-price">
                        + ₦100
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="instructions">
                <textarea
                  className="form-control"
                  id="Note-for-chef"
                  onChange={this.addchefinstructions}
                  placeholder="Add instructions..."
                  rows="5"
                />
                <span className="pull-right max-length">0/200</span>
              </div>
            </div>
            <div className="addmenu-footer">
              <div id="placeorder">
                <div className="placeorder-holder">
                  <h3 className="add" onClick={this.reduceNumberOfItem}>
                    <MdRemove />
                  </h3>
                  <h4 className="item-quantity">
                    {this.state.defaultQuantity}
                  </h4>
                  <h3 className="minus" onClick={this.increaseNumberOfItem}>
                    <Mdadd />
                  </h3>
                </div>
                <button className="btn-large" onClick={this.addToCart}>
                  <div>
                    <h4 className="second">
                      Add {this.state.defaultQuantity} to cart
                    </h4>
                    <h5 className="third">₦{this.state.itemTotal}.00</h5>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(addmenu);

/*<FacebookShareButton url={'http://localhost:3000/restaurant/'+this.props.menuinview.menuinview.chefuid}
                            quote='To try this me. Click on the link'>
                            <FacebookIcon className="fb" size={32} round={true} />
                        </FacebookShareButton>


                        <TwitterShareButton url={'http://localhost:3000/restaurant/'+this.props.menuinview.menuinview.chefuid}
                            title='Find this meal on the link below...'
                            >
                            <TwitterIcon className="twt" size={32} round={true} />
                        </TwitterShareButton>*/
