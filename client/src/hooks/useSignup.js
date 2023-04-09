import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = ()=>{
    const [error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async(email,password,firstName,lastName,mobile) =>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('api/user/register',{
            method: "POST",
            headers: {'Content-Type':"application/json"},
            body:JSON.stringify({email,password,firstName,lastName,mobile})
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:"LOGIN",payload:json})
         
            setIsLoading(true)
        }

    }
    return {signup,isLoading,error}
}