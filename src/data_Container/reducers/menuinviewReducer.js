 const initialstate={
     menuinview:null
 }

 const menuinview=(state=initialstate,action)=>{
     switch(action.type){
        case'ADD_MENU_IN_VIEW':{
            return{
                ...state,
                menuinview:action.payload
            }
        }
        default:{
            return state;
        }
     }
     
 }

 export default menuinview;