import { SellerAuthContext } from "../context/SellerAuthContext";
import { useContext } from "react";

export const useSellerAuthContext = () =>{
    const context = useContext(SellerAuthContext)

    if(!context){
        throw Error('useSellerAuthContext must be used inside an ContextProvider')
    }

    return context
}