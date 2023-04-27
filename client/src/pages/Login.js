import { useState } from "react";
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        console.log(error)
        e.preventDefault()
        await login(email, password)
    }
    return (
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
                    style={{ minHeight: '100vh' }}>
                    <div>
                        <Grid item xs={200}
                            style={{ padding: "2" }}
                        >
                            <Box
                                textAlign="center">
                                <h1>
                                    Welcome Back 👋🏼
                                </h1>


                            </Box>
                        </Grid>
                        <Grid item xs={200}
                            style={{ padding: "10" }}>
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
                        <Grid item xs={20}>
                            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                size="1"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                style={{ width: '2rem',boxShadow: 'none' ,backgroundColor:'transparent' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />

                            </FormControl>
                        </Grid>
                    </div>
                    <Grid item xs={20}>
                        <Button variant="contained" disabled={isLoading} type="submit"
                            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight: "bold" }}
                        >Login</Button>
                    </Grid>

                    <p className="text" style={{ color: "#063970" }}>New User? <span><Link to="/signup" style={{ fontWeight: "bold", color: "#063970" }}>Signup</Link></span></p>
                    <p className="text" style={{ color: "#063970" }}><span><Link to="/reset-password" style={{ fontWeight: "bold", color: "#063970" }}>Forgot Passowrd?</Link></span></p>

                    {error && <Alert variant="filled" severity="error" style={{ fontWeight: "bold" }}>{error}</Alert>}

                </Grid>
            </Box>
        </div>
    )

}

export default Login;