import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useSignup = ()=>{
    const [error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
   

    const signup = async(email,password,firstName,lastName,mobile,role) =>{
        setIsLoading(true)
        setError(null)

        const data ={
            email,
            password,
            firstName,
            lastName,
            mobile,
            role
        }
        axios.post('/api/user/register',data,{
            headers: {'Content-Type':"application/json"}
        })
        .then(response=>{
            if(response.status === 200){
                const json = response.data
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:"LOGIN",payload:json})
                setIsLoading(true)
            }else{
                setIsLoading(false)
                setError(response.message)
            }
            
        }).catch(error=>{
            setIsLoading(false);
            setError(error.response.data.message);
        })


    }
    return {signup,isLoading,error}
}