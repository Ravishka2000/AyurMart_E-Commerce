import { useState} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";


const Login = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login,error,isLoading} = useLogin()
    const [errorpassword,setmailerror] = useState(false)
    const[showpassword,setshowPassword] = useState(false)

    const isError = ()=>{
        if(error){
            if(error.includes('Incorrect password')){
                setmailerror(true)
                console.log("wrong")
                
            }

        }

    }
    const clickpassword=()=>{
        setshowPassword(!showpassword)
    }

    const handleSubmit = async (e) =>{
        

        e.preventDefault()
        await login(email,password)
        isError()
        
        

    }

    

    return(
        
        <div className="container">
        <div className="main">
            <div className="welcomeBack">
            <h1>
                Welcome
            </h1>
            <h1>
                Back ! ⚡️
            </h1>
           

            </div>
            <form className="login" onSubmit={handleSubmit}>
           
            <h1>
                Hey, hello 👋🏼
            </h1>
            <p className="text">Welcome back ! Please login to your account</p>

            <label>Email</label>
            <input
                type="String"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                
            />
            <label>Password</label>
           
        
            <input
                className = "input"
                type={showpassword ? "text" : "password"}
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            />
           

          
           

            
            <button disabled={isLoading}>Login</button>
    
            

           
            {error && <div className="error">{error}</div>}

            <p className="text">New User? <span><Link to="/signup">Signup</Link></span></p>
            </form>
        </div>
        </div>
        
        
    )

}

export default Login;