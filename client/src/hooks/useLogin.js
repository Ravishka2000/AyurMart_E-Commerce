import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = ()=>{
    const [error,setError] = useState("")
    const[isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async(email,password) =>{
        setIsLoading(true)
        setError(null)
        const data ={
            email,
            password
        }
        
        axios.post('/api/user/login',data,{
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

    return {login,isLoading,error}

    
}