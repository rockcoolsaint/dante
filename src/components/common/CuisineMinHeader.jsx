import React from 'react'
import { Link } from 'react-router-dom'

import { categories } from '../../util/categories.js'
import searchIcon from '../../assets/images/search-icon.svg'
import ajx, { mapStateToProps } from '../../util/ajax'
import lib from '../../util/lib'
import { connect } from 'react-redux'

class CuisineMinHeader extends React.Component {

  componentDidMount() {
    lib.cki('l')
  }
  componentWillReceiveProps(nextProps) {
    (nextProps !== this.props) ?
      (this.props = nextProps,
        setTimeout(() => lib.addClass('l'), 50)) :
      null
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrolld);
  }
  state = {
    showMenu: false,
  }

  showMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu = (event) => {
    if (this.dropdownMenu) {
      if (!this.dropdownMenu.contains(event.target)) {
        document.removeEventListener("click", this.closeMenu);
        this.setState({ showMenu: false })
      }
    }
  }

  render() {
    const cuisineStyle = this.props.otherPage ? 'cuisine-min-header other-page' : 'cuisine-min-header'
    const cuisinePersonalPage = this.props.personalPage ? 'cuisine-min-header cuisine-personal-page ab' : 'cuisine-min-header'
    return (
      <div>
        <div id="head"
          className=
          {
            this.props.otherPage ? cuisineStyle : cuisinePersonalPage
          }
        >
          <div className="nav-section">
            <div className="logo-section">
              <Link to="">
                <img src={ajx.logo}
                  id="bukka-logo"
                  className="img-responsive"
                  alt="logo"
                />
              </Link>
              <div className="search-input">
                <img
                  src={searchIcon}
                  alt="search-icon"
                  id="search-icon"
                />
                <input
                  type="text"
                  onClick={this.showMenu}
                  placeholder="Search for anything..." />
              </div>
            </div>
            <div className="button-section">
              <button onClick={() => lib.toggleSignin()}
                className="sign-in">
                Sign In
        </button>
              <button className="sign-up"
                onClick={() => lib.toggleSignUp()}>
                Sign Up
        </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-lg-offset-1">
            <div id="cuisine-dropdown">
              {
                this.state.showMenu ?
                  <div className="menu"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <h3>cuisines</h3>
                    {categories.map((category) =>
                      category.name ?
                        <div
                          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
                          key={category.id}
                        >
                          <Link
                            to={`/categories/${category.name}`}>{category.name}
                          </Link>
                        </div> : ''
                    )
                    }
                  </div>
                  : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CuisineMinHeader);
