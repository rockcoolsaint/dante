export const initialstatesignup={
	fetching:false,
	fetched:false,
	response:"",
	error:null
};

const signUp=(state=initialstatesignup,action)=>{
	switch(action.type){
		case"SIGN_UP_PENDING":{
			return{...state,fetching:true,fetched:false,response:"",error:null}
		}
		case"SIGN_UP_REJECTED":{
			return{...state,fetching:false,fetched:false,response:"",error:action.payload}
		}
		case"SIGN_UP_FULFILLED":{
			return{...state,fetching:false,fetched:true,response:action.payload.data,error:null}
		}
		default:
		return state;
	}
}

export default signUp;