import { useState } from "react";
import { useSellerAuthContext } from "./useSellerAuthContext";

export const useSellerLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useSellerAuthContext()
  
    const sellerlogin = async (email, password) => {
      setIsLoading(true)
      setError(null)
  
      const response = await fetch('http://localhost/7004/api/seller/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password })
      })
      
      const json = await response.json()
  
      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem('seller', JSON.stringify(json))
  
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading(false)
      }
    }
  
    return { sellerlogin, isLoading, error }
  }