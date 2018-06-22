import {applyMiddleware,createStore} from 'redux'
import reducers from'./reducers/combinedreducers'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { loadState,saveState } from './localStorage'
import throttle from 'lodash/throttle'
import {initialstatesignup} from './reducers/signUpReducer'
import {initialstatechefs} from './reducers/getChefReducer'
import {initialstatepage} from './reducers/showPageReducer'
import {initialstateCart} from './reducers/updateCartReducer'


const middleware=applyMiddleware(promise(),thunk,logger)
const persistedState=loadState()

const store=(persistedState)?
                createStore(reducers,persistedState,middleware):
                createStore(reducers,middleware)

store.subscribe(throttle(()=>{
   saveState({
                address:{
                            ...store.getState().address,
                            apartment:"",
                            deliverynote:""
                        },
                chef:{ 
                        ...initialstatechefs,
                        //currentCuisine:store.getState().chef.currentCuisine,
                        first_search_completed:store.getState().chef.first_search_completed
                    },
                cart:{
                    ...initialstateCart
                },
                user:{  
                        ...store.getState().user,
                        forgot_password:{
                            error:null,
                            done:false,
                            fetching:false,
                            fetched:false
                        },
                        fetching:false,
                        fetching_lastCardDigits:false,
                        fetching_addcard:false,
                        fetching_orderhistory:false,
                        orderstatus_fetching:false,
                        error:null 
                    },
                page:{
                        ...initialstatepage,
                        prevpath:store.getState().page.prevpath
                    },
                SignUp:initialstatesignup,
                receipt:store.getState().receipt,
                menuinview:store.getState().menuinview     })
},1000))

export default store;

