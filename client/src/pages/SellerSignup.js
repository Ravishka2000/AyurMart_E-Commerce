import { useState } from "react"
import { useSellerSignup } from "../hooks/useSellerSignup";

const SellerSignup = () => {
  const [firstName,setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [email, setEmail] = useState('')
  const [mobile,setMobile] = useState('');
  const [address,setAddress] = useState('');
  const [password, setPassword] = useState('')
  const {sellersignup, error, isLoading} = useSellerSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await sellersignup(firstName, lastName, email, mobile, address, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <br></br><br></br>
      <h1>Register As a Seller</h1>
      
      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setfirstName(e.target.value)} 
        value={firstName} 
      />

      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setlastName(e.target.value)} 
        value={lastName} 
      />

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Mobile Number:</label>
      <input 
        type="text" 
        onChange={(e) => setMobile(e.target.value)} 
        value={mobile} 
      />

      <label>Address:</label>
      <input 
        type="text" 
        onChange={(e) => setAddress(e.target.value)} 
        value={address} 
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default SellerSignup