import { createContext, useEffect, useReducer } from "react";

export const SellerAuthContext = createContext()
export const sellerauthReducer = (state,action) =>{
    switch(action.type) {
        case 'LOGIN' :
            return {seller:action.payload};
        case 'LOGOUT' :
            return {seller:null};
        default:
            return state
    }

}
export const SellerAuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(sellerauthReducer,{
        seller:null
    })

    useEffect (() =>{
        const seller = JSON.parse(localStorage.getItem('seller'))

        if(seller){
            dispatch({type:'LOGIN',payload:seller})
        }
    },[])

    console.log("SellerAuthContext state: ", state)

    return(
        <SellerAuthContext.Provider value={{...state,dispatch}}>
            {children}
        </SellerAuthContext.Provider>
    )
}