export const loadState=()=>{
    try{
        const serializedState=localStorage.getItem('myBukkaApp')
        if(serializedState===undefined){
            return undefined
        }
        return JSON.parse(serializedState)
        
    }catch(err){
        return undefined
    }
}

export const saveState=(state)=>{
    try{
        const serializedState=JSON.stringify(state)
        localStorage.setItem('myBukkaApp',serializedState)
    }catch(err){
        console.log("couldnt save state",err)
    }
}