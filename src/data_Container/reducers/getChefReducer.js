export const initialstatechefs={
	fetching:false,
	fetched:false,
	fetched_chefsInYourArea:false,
	fetched_chefAndCuisine:false,
	fetching_chefAndCuisine:false,
	first_search_completed:false,
	chefsInYourArea:{},
	chefAndCuisine:{},
	yourChef:{},
	menuCategoriesKeys:[],
	menuCategories:[],
	currentCuisine:null,
	error:null
};

const getChefs=(state=initialstatechefs,action)=>{
	switch(action.type){
		case'GET_CHEFS_PENDING':{
			return{
				...state,
				fetched:false,
				fetched_chefsInYourArea:false,
				fetched_chefAndCuisine:false,
				fetching_chefAndCuisine:true,
				fetching:true,
				chefsInYourArea:{},
				chefAndCuisine:{},
				yourChef:{},
				menuCategoriesKeys:[],
				menuCategories:[],
			}
		}
		case'GET_CHEFS_REJECTED':{
			return{
				...state,
				fetching:false,
				fetched:false,
				fetched_chefsInYourArea:false,
				fetched_chefAndCuisine:false,
				fetching_chefAndCuisine:false,
				error:action.payload,
				chefsInYourArea:{},
				yourChef:{},
				chefAndCuisine:{},
				menuCategoriesKeys:[],
				menuCategories:[]
				}
		}
		case'GET_CHEFS_FULFILLED':{
			return{
				...state,
				fetched:false,
				fetched_chefsInYourArea:true,
				chefsInYourArea:action.payload.data,
				error:null
			}
		}
		
		case 'GET_CHEFS_UPDATE':{
			return{
				...state,
				fetching:false,
				fetched:true,
				yourChef:action.payload.yourChef,
				menuCategoriesKeys:action.payload.categ,
				menuCategories:action.payload.menu,
				currentCuisine:action.payload.cuisine,
				error:null
			}
		}
		case 'GET_CHEFS_UPDATE_FAILED':{
			return{
				...state,
				fetching:false,
				fetched:false,
				error:action.payload
			}
		}
		case 'GET_CHEF_AND_CUISINE':{
			return{
				...state,
				fetched:false,
				chefAndCuisine:action.payload,
				fetched_chefAndCuisine:true,
				fetching_chefAndCuisine:false,
				first_search_completed:true,
				yourChef:{},
				menuCategoriesKeys:[],
				menuCategories:[],
				error:null
				
			}
		}
		default:{
			return{...state}
		}
	}
};

export default getChefs;