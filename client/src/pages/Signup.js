import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [mobile,setMobile] = useState('');

    const {signup,error,isLoading} = useSignup();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await signup(email,password,firstName,lastName,mobile)
    }

    return(
        <div className="container">
        <div className="main">
        <div className="welcomeBack">
        <h1>
          Welcome ! 
        </h1>

        </div>
        <form className="signUp" onSubmit={handleSubmit}>
            <h1>
            Hey, hello 👋🏼
            </h1>
            <p className="text">
                Sign up to know the ☕️ at work ! 
            </p>
        
            <label>Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>First name</label>
            <input
                type="text"
                onChange={(e) => setfirstName(e.target.value)}
                value={firstName}
            />

            <label>Last name</label>
            <input
                type="text"
                onChange={(e) => setlastName(e.target.value)}
                value={lastName}
            />

           
            <label>mobile</label>
            <input
                type="text"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            />



            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}

            <p className="text">Already have an account? <span><Link to="/login">Login Here</Link></span></p>

        </form>
        </div>
        </div>
    )

}

export default Signup;