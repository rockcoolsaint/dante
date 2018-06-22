import axios from 'axios'
import requestPromise from 'request-promise'
import ajx from '../../util/ajax'
import storage from '../store'

//forgot Password
export const forgot_password = (email) => ({
	type: "FORGOT_PASSWORD",
	payload: requestPromise({
		method: 'POST',
		url: ajx.forgot_password,
		headers: { 'Content-Type': 'application/json' },
		body: {
			email,
			link: ajx.link
		},
		json: true
	})
})
//update user info
export const edit_user = (_) => ({
	type: "EDIT_USER_INFO",
	payload: requestPromise(
		{
			method: 'POST',
			url: ajx.edit_user + storage.getState().user.user.uid,
			body: { ..._ },
			json: true
		}
	)
})
//sign in
export const identify_user = (email, password) => ({
	type: 'IDENTIFYING_USER',
	payload: axios.post(ajx.loginendpoint, { email, password })
})
//signup
export const signup = (email, firstname, lastname, password, mobile, isCustomer) => ({
	type: 'SIGN_UP',
	payload: axios.post(ajx.signupendpoint, { email, firstname, lastname, password, mobile, isCustomer })
})

//get card details
//takes uid as argument
export const updating_user_info = (uid) => ({
	type: 'UPDATING_USER_INFORMATION',
	payload: axios.get(ajx.carddtlsendpoint + uid)
})

//fetch list of chefs
export const fetch_chef = (_) => ({
	type: 'GET_CHEFS',
	payload: axios.get(ajx.chefendpoint + _)
})

//menu in view info
export const menuview = (_) => ({
	type: 'ADD_MENU_IN_VIEW',
	payload: _
})
//add new transaction
export const transaction = (_) => ({
	type: 'ADD_NEW_TRANSACTION',
	payload: _
})
//clear transaction object
export const cleartransaction = () => ({
	type: 'CLEAR_TRANSACTION',
	payload: []
})
//place order
export const order = (_) => ({
	type: 'ORDER_STATUS',
	payload: Promise.all(_)
})
//menupage timestamp
export const prev_path = (_) => ({
	type: 'PREV_PATH',
	payload: _
})
//update chef in cart
export const update_chef_in_cart = (_) => ({
	type: 'UPDATE_CHEF',
	payload: _
})
//TIME_TO_REAUTHENTICATE
export const time_to_reauthenticate = (_) => ({
	type: 'TIME_TO_REAUTHENTICATE',
	payload: {
		is_time_to_reauthenticate: storage.getState().user.time_to_reauthenticate.is_time_to_reauthenticate,
		url: _
	}
})
//TRANSACTION_ERROR
export const transaction_error = (_) => ({
	type: 'TRANSACTION_ERROR',
	payload: {
		isError: storage.getState().user.transactionError.isError,
		error: _
	}
})
export const chef_Cuisine = (_) => ({
	type: 'GET_CHEF_AND_CUISINE',
	payload: _
})
export const fetch_address = (add, latLng) => ({
	type: 'FETCH_ADDRESS',
	payload: { address: add, lng: latLng.lng, lat: latLng.lat }
})
export const apartment_info = (_) => ({
	type: 'APARTMENT',
	payload: _
})
export const order_error = (_) => ({
	type: "ORDER_ERROR_PAGE",
	payload: _
})
export const delivery_info = (_) => ({
	type: 'DELIVERY_NOTE',
	payload: _
})
export const show_receipt = (receipt) => ({
	type: 'RECEIPT',
	payload: receipt
});
export const is_restaurant = (_) => ({
	type: 'IS_RESTAURANT',
	payload: _
})
export const get_chef = (chef) => ({
	type: 'GET_CHEFS_UPDATE',
	payload: chef
});
export const showsignIn = (signin) => ({
	type: 'SIGN_IN',
	payload: signin
});
export const showsignUp = (signup) => ({
	type: 'SIGN_UP',
	payload: signup
});
export const showaddCard = (addCard) => ({
	type: 'ADD_CARD_PAGE',
	payload: addCard
});
export const showaddmenu = (addmenu) => ({
	type: 'ADD_MENU',
	payload: addmenu
});
export const showDifChefsError = (p) => ({
	type: 'DIF_CHEF_ERROR',
	payload: p
})
export const showfirstpageloader = (_) => ({
	type: 'FIRST_PAGE_LOADER',
	payload: _
})
export const showpaymentinfo = (_) => ({
	type: 'PAYMENT_INFO',
	payload: _
})
export const showorderhistory = (_) => ({
	type: 'ORDER_HISTORY',
	payload: _
})
export const shownotification = (_) => ({
	type: 'NOTIFICATION',
	payload: _
})
export const showbasicinformation = (_) => ({
	type: 'BASIC_INFORMATION',
	payload: _
})
export const showforgotpassword = (_) => ({
	type: 'FORGOT_PASSWORD_PAGE',
	payload: _
})
export const signout = () => ({
	type: 'SIGN_OUT'
});

export const addcard = (response) => ({
	type: 'ADD_CARD',
	payload: response
});

export const orderhistory = (response) => ({
	type: 'FETCH_ORDER_HISTORY',
	payload: response
});
export const update_cart = (response) => ({
	type: 'UPDATE_CART',
	payload: response
});
export const get_chef_update_failed = (response) => ({
	type: 'GET_CHEFS_UPDATE_FAILED',
	payload: response
});
export const clear_receipt = () => ({
	type: 'CLEAR_RECEIPT'
});
export const add_receipt = (receipt) => ({
	type: 'ADD_RECEIPT',
	payload: receipt
});
export const delete_cart = () => ({
	type: 'DELETE_CART'
})
