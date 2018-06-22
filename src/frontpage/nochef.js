import React from 'react'
import '../style/nochef.css'
import '../style/App.css'
import PageBackground from '../frontpage/gmap'
import Footer from '../components/common/Footer'
import HeaderCheckout from './HeaderCheckout'
import { connect } from 'react-redux'
import { mapStateToProps } from '../util/ajax'


const NoChefAvailable = (props) => {
    return (
        <div className="deven">
            <HeaderCheckout />
            <PageBackground one={true} bloc={{ lat: props.address.lat, lng: props.address.lng }} />
            <div id="no-chef-available">
                <div id="no-chef-available-holder">
                    {
                        (props.chef.error.response) ?
                            (props.chef.error.response.status === 404) ?
                                <h3>
                                    We are deeply sorry!
                            {" " + props.chef.error.response.data}
                                </h3> :
                                <h3>
                                    We are deeply sorry!
                            {" " + props.chef.error.response.data}
                                </h3> :
                            <h3>
                                We are deeply sorry!
                            {" " + props.chef.error.message}
                            </h3>
                    }
                    {(props.chef.error.response) ?
                        <h5>
                            My Bukka isn't available in this area right now. But we're continuing to expand please check back soon!
                </h5> :
                        <h5>
                            Please try again
                </h5>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect(mapStateToProps)(NoChefAvailable)
