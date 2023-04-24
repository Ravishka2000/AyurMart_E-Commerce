import { useSellerAuthContext } from "./useSellerAuthContext"

export const useSellerLogout=()=>{
    const {dispatch} = useSellerAuthContext()

    const sellerlogout = () =>{
        localStorage.removeItem('seller')
        dispatch({type:'LOGOUT'})
    }

    return {sellerlogout}   
}