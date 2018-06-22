import  React, {Component } from 'react';
import '../style/PageBackground.css';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default class PageBackground extends Component{

	constructor(props) {
		super(props);
		this.state={
			position:[2,2]
		};
		}
	componentDidMount() {
			this.setState({position:this.props.loc});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.loc!==this.state.position){
			this.setState({position:nextProps.loc});
		}
	}
							   
	render(){
		return (
			<div className="map-holder">
      <Map center={this.state.position} zoom={15} >
        <TileLayer
          attribution=''
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
        </Map>
        </div>
        );
		}
	}