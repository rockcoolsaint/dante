export const initialstateCart={
	cart:{},
	total:0.00
};

const updateCart=(state=initialstateCart,action)=>{
	switch(action.type){
		case'UPDATE_CART':{
			return{
				cart:{
						...state.cart,
						...action.payload.cart	},
				total:action.payload.total	
														}
		}
		case'DELETE_CART':{
			return{...initialstateCart}
		}
		default:{
			return{...state}
		}
	}
}
export default updateCart;