import React from 'react'

import CuisineMinHeader from './CuisineMinHeader'
import cuisineHeaderImage from '../../assets/images/cuisine.png'
import '../../style/cuisineHeader.css'

const CuisineHeader = () => (
  <div className="cuisine-header">
    <CuisineMinHeader />
    <div className="cuisine-max-header">
      <div className="description-section">
        <span>
          <span>You crave.</span><br />
          <span>We get it.</span>
        </span>
        <img src={cuisineHeaderImage} alt="cuisine-header" />
      </div>
    </div>
  </div>
);

export default CuisineHeader;
