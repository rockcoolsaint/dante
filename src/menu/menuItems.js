import React from "react";
import "../style/App.css";
import "../style/menuItems.css";
import lib from "../util/lib";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import ajx, { mapStateToProps } from "../util/ajax";
import { CSSTransitionGroup } from "react-transition-group";
import {
  DropdownButton,
  MenuItem,
  Tabs,
  Tab,
  TabContainer,
  TabContent,
  TabPane
} from "react-bootstrap";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ShoppingCart from "../frontpage/shoppingCart";
import MdShoppingCart from "react-icons/lib/md/shopping-cart";
import locationIcon from "../assets/images/placeholder.svg";
import timeIcon from "../assets/images/clock.svg";
import searchIcon from "../assets/images/search-icon.svg";
import deliveryIcon from "../assets/images/delivery-icon.svg";

class MenuItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchMenu: false,
      showScheduleMenu: false,
      display: "inline-block",
      position: "relative",
      top: "500px",
      search: "",
      deliveryActive: true,
      pickupActive: false
    };
    this.hideCart = this.hideCart.bind(this);
    this.cartClick = this.cartClick.bind(this);
    this.cartHover = this.cartHover.bind(this);
    this.scrollDetector = this.scrollDetector.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    console.log(this.props, "this is the props");
  }
  componentDidMount() {
    lib.cki("l");
    window.addEventListener("scroll", this.scrollDetector);
  }
  componentWillReceiveProps(nextProps) {
    nextProps !== this.props
      ? ((this.props = nextProps), setTimeout(() => lib.addClass("l"), 50))
      : null;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollDetector);
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleOnClick = () => {
    this.setState({ showSearchMenu: true }, () => {
      document.addEventListener("click", this.closeDropdownMenu);
    });
  };

  handleClickSchedule = () => {
    this.setState({ showScheduleMenu: true }, () => {
      document.addEventListener("click", this.closeDropdownScheduleMenu);
    });
  };

  closeDropdownMenu = event => {
    if (this.deliveryDropdownMenu) {
      if (!this.deliveryDropdownMenu.contains(event.target)) {
        document.removeEventListener("click", this.closeDropdownMenu);
        this.setState({ showSearchMenu: false });
      }
    }
  };

  closeDropdownScheduleMenu = event => {
    if (this.deliveryDropdownMenu) {
      if (!this.deliveryDropdownMenu.contains(event.target)) {
        document.removeEventListener("click", this.closeDropdownScheduleMenu);
        this.setState({ showScheduleMenu: false });
      }
    }
  };

  scrollDetector() {
    if (window.innerWidth > 768) {
      if (window.scrollY > 542) {
        this.setState({
          position: "fixed",
          top: "0%"
        });
      } else {
        this.setState({
          position: "relative",
          top: "500px"
        });
      }
    }
  }

  cartClick() {
    this.setState({
      display: "inline-block"
    });
  }

  cartHover() {
    this.setState({
      display: "inline-block"
    });
  }

  hideCart() {
    this.setState({
      display: "none"
    });
  }

  delivery = () => {
    this.setState({
      deliveryActive: true,
      pickupActive: false
    });
  };

  pickup = () => {
    this.setState({
      deliveryActive: false,
      pickupActive: true
    });
  };

  render() {
    const options = [
      'Tomorrow',
      'Thu, June 14, 2018',
      'Fri, June 15, 2018',
      'Sat, June 16, 2018',
      'Mon, June 18, 2018',
    ]

    const time = [
      '10:00AM - 10:30AM',
      '10:30AM - 11:00AM',
      '11:00AM - 11:30AM',
      '11:30AM - 12:00PM'
    ]
    const defaultOption = options[0]
    const defaultTime = time[0]
    const { Location } = this.props.address;
    const additem = e => {
      e.stopPropagation();
      e.preventDefault();
      const menu = {
        category: e.currentTarget.dataset.category,
        desc: e.currentTarget.dataset.desc,
        hour: e.currentTarget.dataset.hour,
        menu: e.currentTarget.dataset.menu,
        min: e.currentTarget.dataset.min,
        price: e.currentTarget.dataset.price,
        quantity: e.currentTarget.dataset.quantity,
        visibility: e.currentTarget.dataset.visibility,
        image: e.currentTarget.dataset.image,
        chefuid: this.props.chef.yourChef.uid
      };
      lib.addItem(menu);
    };

    return (
      <div>
        <div className="MenuList min-length" id="many">
          <div
            className="cart-menu"
            style={{
              top: this.state.top,
              position: this.state.position
            }}
          >
            <div className="row">
              <div className="col-xs-5">
                <div className="delivery-pickup">
                  <span
                    className={
                      this.state.deliveryActive
                        ? "delivery-btn delivery-active"
                        : "delivery-btn"
                    }
                    onClick={this.delivery}
                  >
                    Delivery{" "}
                  </span>
                  {" "}
                  &nbsp; or &nbsp;
                  <span
                    className={
                      this.state.pickupActive
                        ? "delivery-btn delivery-active"
                        : "delivery-btn"
                    }
                    onClick={this.pickup}
                  >
                    Pickup{" "}
                  </span>
                </div>
                <div className="divide" />
                <span>
                  {Location
                    ? <span
                        className="location-address"
                        onClick={this.handleOnClick}
                      >
                        <img
                          src={locationIcon}
                          className="location-pointer"
                          alt="location-icon"
                        />
                        &nbsp;{Location.split(",")[0]}
                      </span>
                    : null}
                </span>
                <div className="divide" />
                <span>
                  <span
                    className="location-address"
                    onClick={this.handleClickSchedule}
                  >
                    <img
                      src={timeIcon}
                      className="location-pointer"
                      alt="time-icon"
                    />
                    &nbsp;<span className="menu-schedule">ASAP</span>
                  </span>
                </span>
                <div className="container">
                  <div className="col-lg-offset-1">
                    <div
                      className="delivery-dropdown"
                      ref={element => {
                        this.deliveryDropdownMenu = element;
                      }}
                    >
                      {this.state.showSearchMenu
                        ? <ul>
                            <li>
                              <span>
                                <img
                                  src={searchIcon}
                                  alt="search-icon"
                                  id="search-icon"
                                />
                              </span>
                              <input
                                type="text"
                                placeholder="Enter your delivery address..."
                              />
                            </li>
                            <div class="horizontal-line" />
                            <li>
                              <span>
                                <img
                                  src={deliveryIcon}
                                  id="search-icon"
                                  alt="delivery-icon"
                                />
                              </span>
                              <Link to="">Use Current Location</Link>
                            </li>
                          </ul>
                        : null}
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="col-lg-offset-1">
                    <div
                      className="delivery-dropdown"
                      ref={element => {
                        this.deliveryDropdownMenu = element;
                      }}
                    >
                      {this.state.showScheduleMenu
                        ? <div>
                            <Tabs
                              defaultActiveKey={1}
                              animation={false}
                              id="noanim-tab-example"
                            >
                              <Tab eventKey={1} title="ASAP">
                              <ul className="menu-delivery-itemz">
                              <li className="menu-delivery-list">
                                <span>Today</span>
                              </li>
                              <div className="horizontal-line-new" />
                              <li className="menu-delivery-list">
                                <span>As soon as possible (20-35 mins)</span>
                              </li>
                              <div class="horizontal-line-new" />
                              <li>
                              <button className="set-delivery-time">SET DELIVERY TIME</button>
                              </li>
                            </ul>
                              </Tab>
                              <Tab eventKey={2} title="Schedule">
                              <ul className="menu-delivery-itemz">
                              <li>
                              <Dropdown
                              controlClassName='menu-delivery-date'
                              menuClassName="menu-delivery-options"
                              options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                              </li>
                              <div class="horizontal-line-new" />
                              <li>
                                <Dropdown
                                controlClassName='menu-delivery-date'
                                menuClassName="menu-delivery-options"
                                options={time} onChange={this._onSelect} value={defaultTime} placeholder="Select an option" />
                              </li>
                              <div class="horizontal-line-new" />
                              <li>
                              <button className="set-delivery-time">SET DELIVERY TIME</button>
                              </li>
                            </ul>
                              </Tab>
                            </Tabs>

                          </div>
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="menu-search">
                  <span className="search-icon">
                    <svg width="15" height="14">
                      <defs>
                        <path
                          d="M558.537 39.423L562 42.886l-.757.757-3.43-3.431a5.845 5.845 0 0 1-3.942 1.521h-.004a5.867 5.867 0 0 1 0-11.733h.004a5.867 5.867 0 0 1 4.666 9.423z"
                          id="a"
                        />
                      </defs>
                      <path
                        stroke="#8F95A3"
                        d="M13.243 12.936l.05-.05-3.419-3.419.266-.347A5.367 5.367 0 0 0 5.87.5h-.004a5.367 5.367 0 0 0 0 10.733h.004a5.344 5.344 0 0 0 3.606-1.391l.352-.32 3.414 3.414z"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    className="cuisine-menu-search"
                    placeholder="Search items"
                    onChange={this.updateSearch}
                    value={this.state.search}
                  />
                </div>
              </div>
              <div className="col-xs-3">
                {this.props.chef.fetched
                  ? <div>
                      <div />
                      <div
                        className="m-cart-not-signed-in display-toggle shopping-cart-btn"
                        onClick={this.cartClick}
                        onMouseOver={this.cartHover}
                        id="l"
                      >
                        <MdShoppingCart className="shopping-cart display-toggle" />
                        <div className="button-divider" />
                        <span className="item-number">
                          {Object.keys(this.props.cart.cart).length
                            ? lib.amountofitems()
                            : 0}
                          &nbsp;ITEMS{" "}
                        </span>
                        {Object.keys(this.props.cart.cart).length
                          ? <div
                              className="m-cart-items"
                              style={{ display: "inline-block" }}
                            >
                              <span style={{ display: this.state.display }}>
                                <ShoppingCart />
                              </span>
                            </div>
                          : <div
                              className="m-cart-items"
                              style={{ display: "none" }}
                            >
                              <ShoppingCart />
                            </div>}
                      </div>
                    </div>
                  : null}
              </div>
            </div>
          </div>
          {Object.keys(this.props.chef.yourChef).length
            ? this.props.chef.yourChef.menu.length
                ? this.props.chef.yourChef.visibility
                    ? this.props.chef.menuCategoriesKeys.map((categ, key) => {
                        return (
                          <div
                            className="eachMenuHolder"
                            onClick={this.hideCart}
                            key={key}
                          >
                            <div className="category">
                              <span>
                                <svg
                                  className="css-j0ntv4 e7fxc0c0"
                                  width="20"
                                  height="19"
                                  viewBox="0 0 20 19"
                                >
                                  <path
                                    d="M16.18 18.75L10 14.697 3.82 18.75l2-7.046L0 7.162l7.417-.302L10 0l2.583 6.86L20 7.162l-5.82 4.542"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                  />
                                </svg>
                              </span>
                              &nbsp;
                              <span id={categ}>
                                {this.props.chef.menuCategories[categ].length >
                                  0
                                  ? categ
                                  : null}
                              </span>
                            </div>
                            <hr className="division" />
                            <CSSTransitionGroup
                              transitionName="menu"
                              transitionAppear={true}
                              transitionAppearTimeout={1000}
                              transitionEnter={false}
                              transitionLeave={false}
                            >
                              <div className="row">
                                {this.props.chef.menuCategories[categ]
                                  .filter(item => {
                                    return (
                                      item.menu
                                        .toLowerCase()
                                        .indexOf(
                                          this.state.search.toLowerCase()
                                        ) !== -1
                                    );
                                  })
                                  .map((menu, identifier) => (
                                    <div
                                      className="col-lg-6 menuCol"
                                      key={identifier}
                                      data-id={menu.category + identifier}
                                    >

                                      <div
                                        className="m-menuitem-holder"
                                        onClick={additem}
                                        id={menu.category + identifier}
                                        data-category={menu.category}
                                        data-desc={menu.desc}
                                        data-hour={menu.hour}
                                        data-menu={menu.menu}
                                        data-min={menu.min}
                                        data-price={menu.price}
                                        data-quantity={menu.quantity}
                                        data-visibility={menu.visibility}
                                        data-image={
                                          menu.image
                                            ? menu.image
                                            : ajx[
                                                `${this.props.chef.currentCuisine}`
                                              ]
                                        }
                                      >
                                        <img
                                          src={
                                            menu.image
                                              ? menu.image
                                              : ajx[
                                                  `${this.props.chef.currentCuisine}`
                                                ]
                                          }
                                          alt="food-logo"
                                          className="food-logo img-responsive"
                                          data-id={menu.category + identifier}
                                        />
                                        <h4
                                          className="foodName"
                                          id={menu.menu.split(" ").join("")}
                                          data-id={menu.category + identifier}
                                        >
                                          {menu.menu}
                                        </h4>
                                        <h6
                                          data-id={menu.category + identifier}
                                        >
                                          {menu.desc}
                                        </h6>
                                        <div
                                          className="cartBtn"
                                          data-id={menu.category + identifier}
                                        >
                                          <h4
                                            className="price"
                                            id={identifier + "priceId"}
                                            data-price={menu.price}
                                            data-id={menu.category + identifier}
                                          >
                                            ₦{menu.price}
                                          </h4>
                                          <a /*onClick={increaseNumberOfItem} */
                                            data-id={
                                              identifier + "numberOfItems"
                                            }
                                            style={{ display: "none" }}
                                          >
                                            +
                                          </a>
                                          <p
                                            id={identifier + "numberOfItems"}
                                            style={{ display: "none" }}
                                          >
                                            1
                                          </p>
                                          <a
                                            className="minusButton"
                                            style={{ display: "none" }}
                                            /*onClick={reduceNumberOfItem} */
                                            data-id={
                                              identifier + "numberOfItems"
                                            }
                                          >
                                            -
                                          </a>
                                          <button
                                            className="btn btn-red"
                                            style={{ display: "none" }}
                                            /*onClick={addToCart} */
                                            data-foodname={menu.menu
                                              .split(" ")
                                              .join("")}
                                            data-quantity={
                                              identifier + "numberOfItems"
                                            }
                                            data-price={menu.price}
                                          >
                                            Add to Cart
                                          </button>
                                        </div>
                                      </div>

                                    </div>
                                  ))}
                              </div>
                            </CSSTransitionGroup>
                          </div>
                        );
                      })
                    : <div className="fly">
                        <h4>
                          Sorry! This chef is currently closed,Please checkback around 8:00am to 10:00pm tomorrow.Thank you.
                          {" "}
                        </h4>
                      </div>
                : <div className="fly">
                    <h4>
                      Sorry! This chef currently has no items for sale,Please checkback some other time.Thank you.
                      {" "}
                    </h4>
                  </div>
            : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuItems);

MenuItems.propTypes = {
  chef: propTypes.object.isRequired
};
