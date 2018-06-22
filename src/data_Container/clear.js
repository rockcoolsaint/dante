import storage from './store'
//clear localstorage
export const clearLocalStorage = () =>{
    console.log("Yh!!!")
    console.log(storage.getState())
	if (!storage.getState().user.transactionError){
		console.log('clearing..')
		window.localStorage.clear()
    }
    console.log(storage.getState())
}