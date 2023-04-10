import { useState} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert"
import axios from "axios";
import ResetPassword from "./ResetPassword";
const ForgetPassword=()=>{
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault() 
        setError('')
        axios.post('/api/user/forgot-password-token',{email},{
            headers: {'Content-Type':"application/json"}
        })
        .then(response=>{
            
            if(response.status === 200){
                const json = response.data
                setSuccess("Password reset link is sent to your email addreess")
            }else{
                setError(response.message)
            }
            
        }).catch(error=>{
            setError(error.response.data.message);
        })
        
    }

    return(
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    flexDirection: { xs: "column", sm: "row" }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            justify="space-around" 
            style={{ minHeight: '100vh'}}>
            <div>
            <Grid item xs={200}
            style={{ padding:"2"}}
            >
                <Box 
                textAlign="center">
                <h1>
                Reset Password
                </h1>
                </Box>
            </Grid>
            <Grid item xs={200}
            style={{ padding:"10"}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ width: '35ch' }}
                />
            </Grid>
            </div>
            <Grid item xs={20}>
            <Button variant="contained" type="submit"
            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}>Reset Password</Button>
             {error && <Alert variant="filled" severity="error">{error}</Alert>}
             {success && <Alert variant="filled" severity="success">{success}</Alert>}
            </Grid>
            </Grid>
            </Box>
        </div>
       

    )


}

export default ForgetPassword