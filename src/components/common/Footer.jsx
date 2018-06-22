import React from 'react'
import { Link } from 'react-router-dom'

import ajx from '../../util/ajax'
import '../../style/foot.css'

const Footer = () => (
  <div className="footer container cuisine-footer">
    <div className="logo">
      <img
        className="img-responsive"
        src={ajx.logo}
        alt="bukka" />
    </div>
    <div className="content">
      <div className="bukka">
        <h3>Bukka</h3>
        <ul>
          <li><a>About Bukka</a></li>
          <li><a>Careers</a></li>
          <li><a>Contact</a></li>
          <li><a>Help</a></li>
        </ul>
      </div>
      <div className="partners">
        <h3>Partners</h3>
        <ul>
          <li><a href="https://business.mybukka.com">Bukka for Business</a></li>
          <li><Link to="/event">Bukka for Events</Link></li>
          <li><a href="https://chef.mybukka.com">Become a chef</a></li>
        </ul>
      </div>
      <div className="follow-us">
        <h3>Follow us</h3>
        <ul>
          <li>
            <a 
              href="https://www.facebook.com/mybukka"
              target="_blank"
              rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/mybukka"
              target="_blank"
              rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/mybukka"
              target="_blank"
              rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="copy-right">
      <ul>
        <li><a>&copy; 2018 Warehouse Global Links</a></li>
        <li><a>Terms</a></li>
        <li><a>Privacy</a></li>
      </ul>
    </div>
  </div>
)

export default Footer;



