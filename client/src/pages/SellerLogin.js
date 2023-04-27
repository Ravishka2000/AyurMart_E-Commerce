import { useState } from "react"
import { useSellerLogin } from "../hooks/useSellerLogin";

const SellerLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {sellerlogin, error, isLoading} = useSellerLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await sellerlogin(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <br></br><br></br>
      <h1>Login As a Seller</h1>

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default SellerLogin