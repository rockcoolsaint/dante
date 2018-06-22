import React,{Component} from 'react'
import '../style/menuPage.css'
import FaStar from 'react-icons/lib/fa/star'
import MdMore from 'react-icons/lib/md/more'
import lib from '../util/lib'
import ajx from '../util/ajax'
import propTypes from 'prop-types'

class menuPage extends Component {
	constructor(props){
		super(props)
		this.state={
			isSorted:false,
			SortedChefs:null,
			isRatingSorted:false,
			RatingSortedChefs:null,
			cuisine:null
		}
		this.rearrangedist=this.rearrangedist.bind(this)
		this.rearrangerate=this.rearrangerate.bind(this)
		this.handleSelect=this.handleSelect.bind(this)
	}
	handleSelect(e){
		const v=e.target.value
		if(v==="Distance"){
			this.rearrangedist()
		}else if(v==="Ratings"){
			this.rearrangerate()
		}
	}
	rearrangedist(){
		//await console.log(this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`])

		(!this.state.isSorted)?
		this.setState((prevState,props)=>({
			SortedChefs:this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`].sort((a,b)=>
			a.distance-b.distance)
		})):
		this.setState((prevState,props)=>({
			SortedChefs:this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`].sort((a,b)=>
			b.distance-a.distance)
		}))
		this.setState((prevState,props)=>({
			isSorted:!this.state.isSorted,
			isRatingSorted:false,
			RatingSortedChefs:null,
			cuisine:this.props.chef.currentCuisine
		}))
	}
	rearrangerate(){
		//await console.log(this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`])

		(!this.state.isRatingSorted)?
		this.setState((prevState,props)=>({
			RatingSortedChefs:this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`].sort((a,b)=>
			b.rating_overall-a.rating_overall)
		})):
		this.setState((prevState,props)=>({
			RatingSortedChefs:this.props.chef.chefAndCuisine[`${this.props.chef.currentCuisine}`].sort((a,b)=>
			a.rating_overall-b.rating_overall)
		}))
		this.setState((prevState,props)=>({
			isRatingSorted:!this.state.isRatingSorted,
			isSorted:false,
			SortedChefs:null,
			cuisine:this.props.chef.currentCuisine
		}))
	}
	componentWillReceiveProps(nextProps){
		/*if(this.props!==nextProps){
			this.props=nextProps
		}*/
		if(this.state.isSorted||this.state.isRatingSorted){
			if(this.state.cuisine!==nextProps.chef.currentCuisine)
			this.setState((prevState,props)=>({
				isSorted:false,
				SortedChefs:null,
				isRatingSorted:false,
				RatingSortedChefs:null,
				cuisine:null
			}))
		}
	}


	render(){
	const cui=this.props.chef.currentCuisine
	const mystyle={
    backgroundImage:`url(${ajx[cui]})`
	}
	return(
	(this.props.chef.fetched_chefsInYourArea)?
	(Object.keys(this.props.chef.yourChef).length)?
	<div id="chefinformation">

		<div 	className="menuCont"
				style={mystyle} >
			{	(!this.props.isrestaurant)?
				(Object.keys(this.props.chef.chefAndCuisine).length>1)?
				(this.props.chef.chefAndCuisine[cui].length===1)?
				null:
				<div className="zip ipr">

					{
					this.props.chef.chefAndCuisine[cui].map((chef,key)=>
					<img src={chef.profile_photo}
							alt="chef"
							key={key}
							className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
										"zzr bblk blk blka":
										"zzr bblk blk blkd"
									}
							onClick={()=>lib.updatechefbycuisine(chef)}/>
					)
					}
				</div>:
				null:
				null
			}
      <div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
      <div className="chef-ratings">
			<img id="chef-img"	src={this.props.chef.yourChef.profile_photo}
					style={{border:'3px solid #f69323'}}
					alt="chef"/>
          <br />

          <span className="text-center chef-name">
				{this.props.chef.yourChef.first_name+" "+this.props.chef.yourChef.last_name}
      </span>
      <span className="green-checkmark">
      <svg width="18" height="18" viewBox="0 0 14 14">
          <g fill="none" fill-rule="evenodd">
            <rect fill="#0C9" width="14" height="14" rx="7"></rect>
            <path fill="#FFF" d="M3 7l3 3 4.5-4.5-1-1L6 8 4 6"></path>
          </g>
        </svg>
			</span><br /><br />
      <p className="delivery-time">
        30-15 Mins . Ilupeju, Lagos
      </p>
      <p className="delivery-hours">
        Order Delivery until 9:00 PM · View Open Hours
      </p>
        <br />
      {/**<h5 	className="text-center">
				{this.props.chef.yourChef.role}
			</h5>**/}
          <span className="menu-tag">
					<span>
						{/*(this.props.chef.yourChef.rating_overall===5)?
							(	<span>
									<FaStar/>
									<FaStar/>
									<FaStar/>
									<FaStar/>
									<FaStar/>
								</span>):
						(this.props.chef.yourChef.rating_overall===4)?
						 (	<span>
								<FaStar/>
								<FaStar/>
								<FaStar/>
								<FaStar/>
								<FaStar style={{color:'white'}}/>
							</span>):
						(this.props.chef.yourChef.rating_overall===3)?
							(	<span>
								   <FaStar/>
								   <FaStar/>
								   <FaStar/>
								   <FaStar style={{color:'white'}}/>
								   <FaStar style={{color:'white'}}/>
							   </span>):
						(this.props.chef.yourChef.rating_overall===2)?
							   (	<span>
									  <FaStar/>
									  <FaStar/>
									  <FaStar style={{color:'white'}}/>
									  <FaStar style={{color:'white'}}/>
									  <FaStar style={{color:'white'}}/>
								  </span>):
						(this.props.chef.yourChef.rating_overall===1)?
								  (	<span>
										 <FaStar/>
										 <FaStar style={{color:'white'}}/>
										 <FaStar style={{color:'white'}}/>
										 <FaStar style={{color:'white'}}/>
										 <FaStar style={{color:'white'}}/>
									 </span>):
						(this.props.chef.yourChef.rating_overall===0)?
									 (	<span>
											<FaStar style={{color:'white'}}/>
											<FaStar style={{color:'white'}}/>
											<FaStar style={{color:'white'}}/>
											<FaStar style={{color:'white'}}/>
											<FaStar style={{color:'white'}}/>
										</span>):null


									 */
										Number(Math.round(this.props.chef.yourChef.rating_overall+'e2')+'e-2')
									}

					</span>&nbsp;
					<span>RATINGS</span>
          </span>
          <span className="menu-tag">
            <span>{this.props.chef.yourChef.menu.filter(food=>food.visibility).length}</span>&nbsp;
            <span>MENU</span>
          </span>

          <span className="menu-tag">
            <span>{this.props.chef.menuCategoriesKeys.length}</span>&nbsp;
            <span>VARIETIES</span>
          </span>

			{/* <h1 className="chef-buttons text-center">
				<FaStar className="buttn" id="rate"/>
				<MdMore className="buttn" id="more"/>
      </h1> */}
      </div>
      </div>
      </div>
			{	(!this.props.isrestaurant)?
				(Object.keys(this.props.chef.chefAndCuisine).length)?
				(this.props.chef.chefAndCuisine[cui].length===1)?
					null:
				<div className="vt">
				<div className="m">
					<h5 className="ttm"><b>MORE</b></h5>

					<div className="sd">
							<select className="sd"
									onChange={this.handleSelect}
									>
								<option className="sop" value="Sort">Sort by...</option>
								<option className="sop" value="Distance" >Distance</option>
								<option className="sop" value="Ratings" >Ratings</option>
							</select>
						</div>
					</div>
					<div className="yyv">
					{
						(this.state.isSorted)?
						this.state.SortedChefs.map((chef,key)=>
						<div className="lkt" key={key} >
						<img 	src={chef.profile_photo}
								alt="chef"
								className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
											"bblk blk blka":
											"bblk blk blkd"
										}
								onClick={()=>lib.updatechefbycuisine(chef)}/>
								<div className="t">
									<h6 className="ttn"><b>{chef.first_name+" "+chef.last_name}</b></h6>
									<h6 className="ttd">{(chef.distance).toFixed(2)} km away</h6>
								</div>
								{
									(!chef.visibility)?
									<div className="middle">
										<div className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
											"dpps blk blka":
											"dpps blk blkd"}
											onClick={()=>lib.updatechefbycuisine(chef)}>
											Closed
										</div>
									</div>:
									null
								}
						</div>):
						(this.state.isRatingSorted)?
						this.state.RatingSortedChefs.map((chef,key)=>
						<div className="lkt" key={key} >
						<img 	src={chef.profile_photo}
								alt="chef"
								className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
											"bblk blk blka":
											"bblk blk blkd"
										}
								onClick={()=>lib.updatechefbycuisine(chef)}/>
								<div className="t">
									<h6 className="ttn"><b>{chef.first_name+" "+chef.last_name}</b></h6>
									<h6 className="ttd">{(chef.rating_overall).toFixed(2)} / 5 stars</h6>
								</div>
								{
									(!chef.visibility)?
									<div className="middle">
										<div className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
											"dpps blk blka":
											"dpps blk blkd"}
											onClick={()=>lib.updatechefbycuisine(chef)}>
											Closed
										</div>
									</div>:
									null
								}
						</div>):
					this.props.chef.chefAndCuisine[cui].map((chef,key)=>
					<div className="lkt" key={key} >
					<img 	src={chef.profile_photo}
							alt="chef"
							className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
										 "bblk blk blka":
										 "bblk blk blkd"
									}
							onClick={()=>lib.updatechefbycuisine(chef)}/>
							<div className="t">
								<h6 className="ttn"><b>{chef.first_name+" "+chef.last_name}</b></h6>
								<h6 className="ttd">{(chef.distance).toFixed(2)} km</h6>
							</div>
							{
								(!chef.visibility)?
								<div className="middle">
									<div className={(JSON.stringify(chef)=== JSON.stringify(this.props.chef.yourChef))?
										"dpps blk blka":
										"dpps blk blkd"}
										onClick={()=>lib.updatechefbycuisine(chef)}>
										Closed
									</div>
								</div>:
								null
							}
					</div>
					)
				}
				</div>
			</div>:
			null:
			null
			}
		</div>

		<ul className="menuHolder menuTop">
					{
						(this.props.chef.fetched_chefsInYourArea)?
							this.props.chef.menuCategoriesKeys.map(
								(categ,key)=> (key<9)?
									<li key={key}>
										<a 		href={'#'+categ}
												className={"m-categories "+categ}
												data-categ={categ}
												onClick={lib.changecol}>
										{categ}
										</a>
									</li>:
									null ):
									null
					}
					{(this.props.chef.menuCategoriesKeys.length>=9)?
						<li id="more" className="r">
							<a id="il" onClick={lib.show}>More...</a>
							{
							(this.props.chef.fetched_chefsInYourArea)?
								<div id='mt' className="moreitems kp d">
									{
										this.props.chef.menuCategoriesKeys.map(
										(categ,key)=> (key>=9)?
												<a 		key={key}
														href={'#'+categ}
														className={"m-categories "+categ}
														data-categ={categ}
														onClick={lib.changecol}>
												{categ}
												</a>:
											null )
									}
								</div>:
							null
							}
						</li>:
						null
					}
				</ul>
	</div>:
	null:
	null
)
}
};

export default menuPage;

menuPage.propTypes={
	chef:propTypes.object.isRequired,
}
