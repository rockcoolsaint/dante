import React, { Component } from 'react';
import '../style/mobileAppComponent.css';
import ajx from '../util/ajax'
import appleLogo from '../assets/images/apple.svg'
import playstoreLogo from '../assets/images/playstore.svg'

export default class mobileAppComponent extends Component {
	render() {
		return (
			<div className="mobileAppImage-holder">
				<div className="mobile">
					<img className="phoneimage  img-responsive"
						src={ajx.mobileimage}
						alt="screenshot" />
				</div>
				<div className="statements">
					<div className="words">
						<h3><b>The New Bukka App</b></h3>
						<p>Take the experience on the go. For those orders you have to make on the go and those late night orders. Use the new improved app Bukka Go! Click below to download yours.</p>
					</div>
					<div className="row app">
						<a className="apple">
							<button>
								<img className="appleicon"
									src={appleLogo}
									alt="apple logo"
								/>
								<span> App Store</span>
							</button>
						</a>
						<a className="google">
							<button>
								<img className="googleicon"
									src={playstoreLogo}
									alt="playstore logo"
								/>
								<span>Play Store</span>
							</button>
						</a>
					</div>
				</div>

			</div>
		)
	}
}
