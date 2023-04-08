import {useAuthContext} from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
const Home=()=>{
    const {user} = useAuthContext()
    const {logout} = useLogout();



    const handleClick =()=>{
        logout()
    }
    return(
        <div>
            Hello
            <button onClick={handleClick}>
            
                Logout
            </button>
            <p>{user.email}</p>
        </div>
    )
}

export default Home