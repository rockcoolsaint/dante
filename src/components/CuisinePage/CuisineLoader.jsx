import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapStateToProps } from '../../util/ajax'

class CuisineLoader extends Component {
  render() {
    return (
      <div>
        {
          (this.props.chef.fetching_chefAndCuisine) ?
            [1, 2, 3].map((cui, key) =>
              <div className="col-sm-4 m" key={key} >
                <div className="lt xyxaa"></div>
                <h5 className="avci xyxaa"></h5>
                <p className="avcib xyxaa"></p>
              </div>) :
            null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(CuisineLoader);
