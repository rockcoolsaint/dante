import React from 'react'
import { Component } from 'react'
import HeaderMax from './HeaderMax'
import HeaderMin from './HeaderMin'
import CuisineMinHeader from '../components/common/CuisineMinHeader'
// import HeaderStories from './headerStories'
import propTypes from 'prop-types'

export default class scrollLogic extends Component{
	constructor(props) {
		super(props);
		this.state={
      scroll:false,
      position: 'relative'
		};
         this.scrollDetector=this.scrollDetector.bind(this);
	}

	 scrollDetector() {
    if(window.innerWidth > 768){
     if(window.scrollY > 460){
       this.setState({
         position: 'fixed'
       })
      }
      else {
        this.setState({
          position: 'relative'
        })
      }
    }
  //       const scrollmax=(Math.max(
  //           document.body.scrollHeight,
  //           document.body.offsetHeight,
  //           document.documentElement.clientHeight,
  //           document.documentElement.scrollHeight,
  //           document.documentElement.offsetHeight ))-(Math.min(
  //               document.body.scrollHeight,
  //               document.body.offsetHeight,
  //               document.documentElement.clientHeight,
  //               document.documentElement.scrollHeight,
  //               document.documentElement.offsetHeight ));
  //       (window.innerWidth>767)?
  //       (!this.props.Located)?
  //       ((window.scrollY/scrollmax)*100>6.943403826787512)?
  //       this.setState({ scroll:true }):
  //       this.setState({ scroll:true }):
  //       (window.scrollY>410)?
  //       this.setState({ scroll:true }):
  //       this.setState({ scroll:true }):
  //       (!this.props.Located)?
  //       ((window.scrollY/scrollmax)*100>6.343403826787512)?
  //       this.setState({ scroll:true }):
  //       this.setState({ scroll:true }):
  //       (window.scrollY>410)?
  //       this.setState({ scroll:true }):
  //       this.setState({ scroll:true })
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollDetector);

    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollDetector);
    }


render() {
        return (
        	(!this.props.chef_fetched)?
            (this.state.scroll)?
                <CuisineMinHeader personalPage isrestaurant={this.props.isrestaurant}/>:
            (this.props.isrestaurant)?
                <CuisineMinHeader personalPage isrestaurant={this.props.isrestaurant}/>:
                <HeaderMax />:
            (this.state.scroll)?
            (window.innerWidth>767)?
                null:
                null:
                <div style={{position: this.state.position}}>
                  <CuisineMinHeader personalPage isrestaurant={this.props.isrestaurant}/>
                </div>
)
}
}


scrollLogic.propTypes={
    chef_fetched:propTypes.bool.isRequired,
    Located:propTypes.bool.isRequired
}
