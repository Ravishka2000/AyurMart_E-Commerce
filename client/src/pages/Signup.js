import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
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
import { green,apple } from "@mui/material/colors";

const Signup = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [mobile,setMobile] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const {signup,error,isLoading} = useSignup();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await signup(email,password,firstName,lastName,mobile)
        
    }

    return(
        
        <div className="container">
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
                    Welcome ! 
                </h1>
                </Box>
            </Grid>

            <Grid item xs={200}
            style={{ padding:"10"}}>
            <TextField
                id="outlined-multiline-flexible"
                label="First Name"
                multiline
                maxRows={4}
                onChange={(e) => setfirstName(e.target.value)}
                value={firstName}
                style={{ width: '35ch' }}
                />
            </Grid>

            <Grid item xs={200}
            style={{ padding:"10"}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Last Name"
                multiline
                maxRows={4}
                onChange={(e) => setlastName(e.target.value)}
                value={lastName}
                style={{ width: '35ch' }}
                />
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

            <Grid item xs={200}
            style={{ padding:"10"}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Mobile"
                multiline
                maxRows={4}
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                style={{ width: '35ch' }}
                />
            </Grid>
            
       

        <Grid item xs={20}>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"

                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            label="Password"
          />
          
        </FormControl>
        </Grid>
            <Button variant="contained" disabled={isLoading} type="submit"
        sx={{ color: 'white', backgroundColor: 'green', borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}
            >Signup</Button>
            {error && <div className="error">{error}</div>}
        </div>
    </Grid>
    </Box>
    </div>
    )

}

export default Signup;