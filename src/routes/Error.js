import { Redirect } from "react-router-dom"
import React from 'react'
import { connect } from 'react-redux'
import NoChefAvailable from '../frontpage/nochef'
import { mapStateToProps } from '../util/ajax'

const Error_ = (props) => (
    (props.chef.error) ?
        < NoChefAvailable /> :
        < Redirect to="/Cuisine" />
)

export default connect(mapStateToProps)(Error_)
