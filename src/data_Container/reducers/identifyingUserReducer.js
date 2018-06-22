const initialstate={
	fetching:false,
	fetched:false, 
	fetching_lastCardDigits:false,
	fetched_lastCardDigits:false,
	fetching_addcard:false,
	fetched_addcard:false,
	user:{},
	lastCardDigits:"",
	isAuthenticated:false,
	error:null,
	orderhistory:[],
	fetching_orderhistory:false,
	fetched_orderhistory:false,
	transaction:[],
	orderstatus_fetching:false,
	orderstatus_fetched:false,
	orderstatus:[],
	user_updated:false,
	forgot_password:{
		error:null,
		done:false,
		fetching:false,
		fetched:false
	},
	time_to_reauthenticate:{
		is_time_to_reauthenticate:false,
		reauthentication_url:""
	},
	transactionError:{
		isError:false,
		error:""
	},
	edit_user:{
		error:null,
		updating_user_info:false,
		updated_user_info:false
	}
};

const identifyUser=(state=initialstate,action)=>{
	switch(action.type){
		case'IDENTIFYING_USER_PENDING':{
			return{	...state,
					fetching:true,
					user_update:false	}
			
		}
		case 'EDIT_USER_INFO_REJECTED':{
			return{
				...state,
				edit_user:{
					error: action.payload.error,
					updating_user_info:false,
					updated_user_info:false
				}
			}
		}
		case 'EDIT_USER_INFO_PENDING':{
			return{
				...state,
				edit_user:{
					error:null,
					updating_user_info:true,
					updated_user_info:false
				}
			}
		}
		case 'EDIT_USER_INFO_FULFILLED':{
			return{
				...state,
				edit_user:{
					error:null,
					updating_user_info:false,
					updated_user_info:true
				},
				user:{
					...state.user,
					email: action.payload.data.email,
					first_name: action.payload.data.first_name,
					last_name: action.payload.data.last_name,
					mobile: action.payload.data.mobile
				}
			}
		}
		case'FORGOT_PASSWORD_PENDING':{
			return{
				...state,
				forgot_password:{
					error:null,
					done:false,
					fetching:true,
					fetched:false
				}
			}
		}
		case 'TRANSACTION_ERROR':{
			return{
				...state,
				transactionError:{
					isError:!action.payload.isError,
					error:action.payload.error
				}
			}
		}
		case 'TIME_TO_REAUTHENTICATE':{
			return{
				...state,
				time_to_reauthenticate:{
					is_time_to_reauthenticate:!action.payload.is_time_to_reauthenticate,
					reauthentication_url:action.payload.url
				}
			}
		}
		case 'ORDER_STATUS_PENDING':{
			return{	...state,
					orderstatus_fetching:true,
					orderstatus_fetched:false,
					orderstatus:[]	}
		}
		case'FORGOT_PASSWORD_FULFILLED':{
			return{
				...state,
				forgot_password:{
					error:null,
					done:action.payload,
					fetching:false,
					fetched:true
				}
			}
		}
		case 'ORDER_STATUS_FULFILLED':{
			return{	...state,
					orderstatus_fetching:false,
					orderstatus_fetched:true,
					orderstatus:action.payload	}
		}
		case'FORGOT_PASSWORD_REJECTED':{
			return{
				...state,
				forgot_password:{
					error:action.payload,
					done:false,
					fetching:false,
					fetched:false
				}
			}
		}
		case 'ORDER_STATUS_REJECTED':{
			return{	...state,
					orderstatus_fetching:false,
					orderstatus_fetched:false,
					orderstatus:action.payload	}
		}
		case 'ADD_NEW_TRANSACTION':{
			return {	...state,
						transaction:action.payload	}
			
		}
		case 'CLEAR_TRANSACTION':{
			return{		...state,
						transaction:action.payload	}
		}
		case'ADD_CARD_PENDING':{
			return{	...state,
					fetching_addcard:true	}
			
		}
		case'FETCH_ORDER_HISTORY_PENDING':{
			return{	...state,
					fetching_orderhistory:true	}
			;
		}
		case'UPDATING_USER_INFORMATION_PENDING':{
			return{	...state,
					fetching_lastCardDigits:true,
					user_updated:false	}
			
		}
		case'UPDATING_USER_INFORMATION_REJECTED':{
			return{	...state,
					fetching_lastCardDigits:false,
					lastCardDigits:"",
					error:action.payload,
					user_updated:false	}
			
		}
		case'FETCH_ORDER_HISTORY_REJECTED':{
			return{	...state,
					fetching_orderhistory:false,
					error:action.payload	}
			
		}
		case'ADD_CARD_REJECTED':{
			return{	...state,
					fetching_addcard:false,
					fetched_addcard:false,
					error:action.payload	}
			
		}
		case'IDENTIFYING_USER_REJECTED':{
			return{	...state,
					fetching:false,
					user:{},
					isAuthenticated:false,
					lastCardDigits:"",
					error:action.payload	}
			
		}
		case'FETCH_ORDER_HISTORY_FULFILLED':{
			return{	...state,
					fetched_orderhistory:true,
					fetching_orderhistory:false,
					orderhistory:action.payload.data,
					error:null	}
			
		}
		case'IDENTIFYING_USER_FULFILLED':{
			return{	...state,
					lastCardDigits:"",
					fetched:true,
					fetching:false,
					user:action.payload.data.data,
					isAuthenticated:true,
					error:null	}
			
		}
		case'UPDATING_USER_INFORMATION_FULFILLED':{
			return{	...state,
					fetching_lastCardDigits:false,
					fetched_lastCardDigits:true,
					lastCardDigits:action.payload.data.data.last,
					error:null,
					user_updated:true	}
			
		}
		case'ADD_CARD_FULFILLED':{
			return{	...state,
					fetching_addcard:false,
					fetched_addcard:true,
					lastCardDigits:action.payload.data.data.last,
					error:null	}
			
		}

		/*case 'EDIT_USER_INFO_PENDING':{
			return{ ...state,
					error: null,
					updating_user_update:false,
					updated_user_update:false}
		}
		case 'EDIT_USER_INFO_FUFILLED':{
			return{ ...state,
					error:null,
					updating_user_update:false,
					updated_user_update:action.payload}
		}
		case 'EDIT_USER_INFO_REJECTED':{
			return{ ...state,
					updating_user_update:false,
					updated_user_update:false,
					error:action.payload}
		}*/

		case 'SIGN_OUT':{
			return{...initialstate}
			
		}
		default:{
			return{...state}
		}
	}
};

export default identifyUser;

