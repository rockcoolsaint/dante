import React,{Component} from 'react'
import '../style/signIn.css'
import Faspinner from 'react-icons/lib/fa/spinner'
import lib from '../util/lib'
import ajx from '../util/ajax'
 
class addcard extends Component{
	constructor(props){
		super(props)
		this.state={
			steps:0
		}
		this.addNewCard=this.addNewCard.bind(this)
	}

	addNewCard(e){
		this.setState((prevState,props)=>({
			steps:prevState.steps+1
		}))
		lib.newcard(e)
	}

	render(){
	return(
		<div className="signInPopup">
			<div className="AddcardPopupHolder">
				<div id="topPart">
					{
						(this.props.user.time_to_reauthenticate.is_time_to_reauthenticate)?
							<p>Authorize</p>:
							<p>Add Card</p>
					}
					<a onClick={()=>lib.toggleShowcard()}>X</a>
				</div>
				{
					(!this.props.user.time_to_reauthenticate.is_time_to_reauthenticate)?
						<form className="formField" autoComplete="off">
							<div id="headingHolder">
								<div id="imageHolder">
									<img src={ajx.visa} alt="visa" />
									<img src={ajx.master} alt="master"/>
									<img src={ajx.verve} alt="verve"/>
									<img  alt=""/>
								</div>
							</div>
							<div id="cardNumberHolder">
								<h4>Card number</h4>
								<input 	id="cardNumber" 
										placeholder="1234-5678-9999-9999"
										autoComplete="off"/>
							</div>
							<div id="extrainfoHolder">
								<div id="info">
									<h4>Expiration</h4>
									<h4>CVV</h4>
								</div>
								<div className="otherinfoHolder">
									<div className="YearDate">
										<input  id="MonthNumber" 
												type="number" 
												min="1" 
												max="12" 
												placeholder="MM" />
										<input  id="YearNumber" 
												type="number" 
												min="2017" 
												max="2099" 
												step="1" 
												placeholder="YYYY" />
									</div>
									<div className="cvvinfo">
										<input  id="CVVNumber" 
												min="100" 
												max="999" 
												placeholder="128"/>
									</div>
								</div>
							</div>
							{(!this.props.user.fetching_addcard && this.state.steps===0)?
								<button className="btn-red" 
										onClick={this.addNewCard}>
									Add Card
								</button>:
								null
							}
							{(this.props.user.fetching_addcard && this.state.steps===1)?
								<button className="btn-red load">
									Just a Second!...
									<span className="loader">
										<Faspinner/>
									</span>
								</button>:
								null
							}
							{(!this.props.user.fetching_addcard && this.state.steps===1)?
								<button className="btn-red load">
									Generating Authentication Code...
									<span className="loader">
										<Faspinner/>
									</span>
								</button>:
								null
							}
						</form>:
						<div className="formField">
							<h4 className="text-center">
								Please click on the button below to authorize your card
							</h4>
							<a 	target='_blank' 
								onClick={()=>lib.reauthorize()}
								href={this.props.user.time_to_reauthenticate.reauthentication_url}
								className="a--btn">
								Authorize
							</a>
						</div>
				}
			</div>
		</div>
		)
	}
}

export default addcard