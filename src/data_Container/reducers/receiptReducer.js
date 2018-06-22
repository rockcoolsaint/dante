const initialstate={
    receipt:{

    },
    tax:0.00,
    deliveryFee:0.00,
    chefProfilepic:'',
    receiptGenerated:false,
}

const receipt=(state=initialstate,action)=>{
    switch(action.type){
        case'ADD_RECEIPT':{
            return{ ...state,
                    receipt:action.payload.receipt,
                    tax:action.payload.tax,
                    deliveryFee:action.payload.deliveryFee,
                    chefProfilepic:action.payload.chefProfilepic,
                    receiptGenerated:!action.payload.receiptGenerated
                }
        }
        case'CLEAR_RECEIPT':{
            return{...initialstate}
        }
        default:{
            return{...state}
        }
    }
}

export default receipt;