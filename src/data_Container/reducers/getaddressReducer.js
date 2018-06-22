const initialstate={
			lng:"",
			lat:"",
			Location:"",
			apartment:"",
			deliverynote:"",
			error:null,
			Located:false,
};

const getaddress=(state=initialstate,action)=>{
			switch(action.type){
				case 'FETCH_ADDRESS':{
					return{
						...state,
						lng:action.payload.lng,
						lat:action.payload.lat,
						Location:action.payload.address,
						Located:true,
					}
				}
				case'APARTMENT':{
					return{
						...state,
						apartment:action.payload
					}
				}
				case'DELIVERY_NOTE':{
					return{
						...state,
						deliverynote:action.payload
					}
				}
				default:{return state}
			}
};

export default getaddress;